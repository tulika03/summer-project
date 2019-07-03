const LocalStorage = require ('node-localstorage').LocalStorage;
 localStorage = new LocalStorage('./localStorage');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const async = require('async');
 const nodemailer = require('nodemailer');
 const smtpTransport = require('nodemailer-smtp-transport');
 const crypto = require('crypto');
 

 const checkAuth = require('./../middleware/checkAuth')
 require('./../../env');

 // employee login

router.post('/Employeelogin', (req, res, next) => {
    console.log('Employee Login page');
     Employee.find({ employee_email: req.body.employee_email })
     .exec()
     .then(employee => {
      localStorage.setItem('loginID', employee[0]._id);
      console.log('local storage'+localStorage.getItem('loginID'));
    // console.log('then block' + employee)
     if(employee.length < 1)
    {
        return res.status(401).json({
         message: 'Authentication failed....'
     });
   }
 bcrypt.compare(req.body.employee_password, employee[0].employee_password, (err, result) => {
     //  console.log('bcrypt compare block')
     if(err) {
         console.log('bcrypt if error block')
         return res.status(401).json({
             message: 'Authentication failed....'
         });
     }
     if(result) {
         const token = jwt.sign({  
                 employee_password: employee[0].employee_password,
                 _id: employee[0]._id,
                 employee_email:  employee[0].employee_email,
                 employee_username:  employee[0].employee_username
             },
             process.env.JWT_KEY,
             {
                 expiresIn: '1h'
             }
         );
         const loginID=localStorage.getItem('loginID');
       return  res.status(200).json({
             message: 'Employee has logged in succesfully....',
             token: token,
             loginID: loginID
         })
     }
 });
 })
     .catch(err => {console.log(err)
         res.status(500).json({error: err })
     });
 });
 
 // forgot password

 router.post('/Employeeforgot', checkAuth, function(req, res, next) {
   async.waterfall([
     function(done) {
       crypto.randomBytes(20, function(err, buf) {
         var token = buf.toString('hex');
         done(err, token);
       });
     },
     function(token, done) {
      Employee.findOne({ employee_email: req.body.employee_email }, function(err, user) {
           console.log(user);
         if (!user) {
           console.log('error', 'No account with that email address exists.');
           return res.redirect('/Employeeforgot');
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
         to: user.employee_email,
         from: 'wberryproject@gmail.com',
         subject: 'Password Reset',
         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
           'http://' + req.headers.host + '/Employeereset/' + token + '\n\n' +
           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
       };
       transport.sendMail(mailOptions, function(err) {
         console.log('info', 'An e-mail has been sent to ' + user.employee_email + ' with further instructions.');
         done(err, 'done');
       });
     }
   ], function(err) {
     if (err) return next(err);
       res.redirect('/Employeeforgot');
   });
 });


// reset password

router.get('/Employeereset/:token', checkAuth, function(req, res) {
  user.findOne({ employee_resetPasswordToken: req.params.token, employee_resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
       if (!user) {
           console.log('error', 'Password reset token is invalid or has expired.');
           return res.redirect('/Employeeforgot');
       }
       res.render('reset', {
           user: req.user

       });
       console.log(req.params.token);
   });
});

router.post('/Employeereset/:token', checkAuth, function(req, res) {
   async.waterfall([
     function(done) {
       user.findOne({ employee_resetPasswordToken: req.params.token, employee_resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
         if (!user) {
           console.log('error', 'Password reset token is invalid or has expired.');
           return res.redirect('back');
         }
 
         user.employee_password = req.body.password;
         user.employee_resetPasswordToken = undefined;
         user.employee_resetPasswordExpires = undefined;
 
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
         to: user.employee_email,
         from: 'wberryproject@gmail.com',
         subject: 'Your password has been changed',
         text: 'Hello,\n\n' +
           'This is a confirmation that the password for your account ' + user.employee_email + ' has just been changed.\n'
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
