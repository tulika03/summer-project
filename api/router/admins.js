const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/admin');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const async = require('async');
 const nodemailer = require('nodemailer');
 const smtpTransport = require('nodemailer-smtp-transport');
 const crypto = require('crypto');
const employeeRoutes = require('./admin/employees');
const categoryRoutes = require('./admin/categories');
const choiceRoutes = require('./admin/choices');
const zoneRoutes=require('./admin/zones');

 router.use('/employee', employeeRoutes);
 router.use('/category', categoryRoutes);
 router.use('/choice', choiceRoutes);
router.use('/zone',zoneRoutes);

require('./../../env');

// add new admin
router.post('/addAdmin', (req, res, next) => {
    Admin.find({admin_email: req.body.admin_email})
        .exec()
        .then(data => {
                if (data.length >= 1) {
                    res.status(409).json({
                        message: 'Email already exists, try different email'
                    });
                } else {
                    bcrypt.hash(req.body.admin_password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else
                            {
                            const admin = new Admin({
                                _id: new mongoose.Types.ObjectId(),
                                admin_firstName: req.body.admin_firstName,
								admin_lastName:req.body.admin_lastName,
								admin_username: req.body.admin_username,
								admin_email: req.body.admin_email,
								admin_password: hash
                            });
                            admin.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: 'Admin created'
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                            }
                     });
                }
            }
        );
});

// admin login

router.post('/login',(req, res, next) => {
     console.log('Login page');
      Admin.find({ admin_email: req.body.admin_email })
      .exec()
      .then(admin => {
      console.log('then block' + admin)
      if(admin.length < 1)
     {
         return res.status(401).json({
          message: 'Authentication failed....'
      });
    }
  bcrypt.compare(req.body.admin_password, admin[0].admin_password, (err, result) => {
      //  console.log('bcrypt compare block')
      if(err) {
          console.log('bcrypt if error block')
          return res.status(401).json({
              message: 'Authentication failed....'
          });
      }
      if(result) {
        const token = jwt.sign({  
            admin_email: admin[0].admin_email,
            _id: admin[0]._id
        },
        process.env.JWT_KEY,
        {
                  expiresIn: '1h'
              }
          );
        return  res.status(200).json({
              message: 'Admin has logged in succesfully....',
              token: token
  
          })
      }
  });
  })
      .catch(err => {console.log(err)
          res.status(500).json({error: err })
      });
  });
  
  // forgot password

  router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        Admin.findOne({ admin_email: req.body.admin_email }, function(err, user) {
            console.log(user);
          if (!user) {
            console.log('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var transport = nodemailer.createTransport(smtpTransport({
          service: 'Gmail',
          auth: {
            user: 'wberryproject@gmail.com',
            pass: 'wberryproject2018'
          },
            tls:
            {
                 rejectUnauthorized: false
            }
        }));
        var mailOptions = {
          to: user.admin_email,
          from: 'wberryproject@gmail.com',
          subject: 'Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transport.sendMail(mailOptions, function(err) {
          console.log('info', 'An e-mail has been sent to ' + user.admin_email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
        res.redirect('/forgot')
    });
  });
 

// reset password

router.get('/reset/:token', function(req, res) {
    User.findOne({ admin_resetPasswordToken: req.params.token, admin_resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {
            user: req.user

        });
        console.log(req.params.token);
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            console.log('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
  
          user.admin_password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
      },
      function(user, done) {
        var transport = nodemailer.createTransport(smtpTransport ({
          service: 'Gmail',
          auth: {
            user: 'wberryproject@gmail.com',
            pass: 'wberryproject2018'
          }
        }));
        var mailOptions = {
          to: user.admin_email,
          from: 'wberryproject@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.admin_email + ' has just been changed.\n'
        };
        transport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });



module.exports = router;
