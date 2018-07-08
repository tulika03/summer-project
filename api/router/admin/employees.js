const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('./../../models/employee');
const bcrypt = require('bcrypt');
const multer = require('multer');

require('./../../../env');
const checkAuth = require('../../middleware/checkAuth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/employees');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});

router.post('/addEmployee', checkAuth, upload.single('employee_photo'), (req, res, next) => {
    console.log("requested file: " + req.file)
    bcrypt.hash(req.body.employee_password, 10, (err, hash) => {
        if(err) {
            res.status(500).json({
                error: err
            });
        }
            else{
                    const employee = new Employee({
                        _id: mongoose.Types.ObjectId(),
                        employee_Id: req.body.employee_Id,
                        employee_firstName: req.body.employee_firstName,
                        employee_lastName: req.body.employee_lastName,
                        employee_photo: "http://localhost:3002/uploads/employees/"+req.file.originalname,
                        employee_contact: req.body.employee_contact,
                        employee_username: req.body.employee_username,
                        employee_email: req.body.employee_email,
                        employee_password: hash
                    
                });
                    employee.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Data inserted successfully.....",
                            data: result
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })                       
                    })
                }   
        })  
    });

    // view details of all employees

    router.get('/view', checkAuth, (req, res,next) => {
        Employee.find()
        .exec()
        .then(result => {
            if(result.length > 0) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: 'No entries found.....'
                })
            }
            
        })
        .catch(err => {
            consol.log(err)
            error: err
        });
    });

    //view entry of an employee
    router.get('/view/:employee_id', checkAuth, (req, res,next) => {
        Employee.find({_id: req.params.employee_id})
        .exec()
        .then(result => {
            if(result.length > 0)
            {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({
                    message: 'entry not found....'
                })
            }
        })
    });

    //update employee record

    router.patch('/update/:employeeId', checkAuth, (req, res, next) => {
        const id = req.params.employeeId;
        Employee.update({_id: id},{$set: {
            employee_Id: req.body.employee_Id,
            employee_firstName: req.body.employee_firstName,
            employee_lastName: req.body.employee_lastName,
            employee_contact:req.body.employee_contact,
            employee_email: req.body.employee_email
           } 
        })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'data updated successfully for employee',
                    data: result
                });
            })
            .catch(err => {
                res.status(500).json(err);
            });
        });

        // delete an employee detail

        router.delete('/delete/:employeeId', checkAuth, (req,res,next) => {
            const id = req.params.employeeId;
            Employee.findOneAndRemove({_id: id})
                .exec()
                .then(result => {
                console.log(result);
                res.status(200).json({
                message: 'You have deleted the employee details' + result
                 })
            })
            .catch(err => {console.log(err);
                res.status(500).json({error: err })
            });
        });

        // change employee image

        router.patch('/updateImage/:employeeId', checkAuth, upload.single('employee_photo'), (req,res,next) => {
            console.log(req.file)
            const id = req.params.employeeId;
            
            if(req.file.path) {
                    Employee.update({_id: id}, {$set: {
                        employee_photo: "http://localhost:3002/uploads/employees/"+req.file.originalname
                        }
                    })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                        message: 'You have updated employee image for ID ' + id
                    });
                })
                .catch(err => {
                    res.status(500).json(err)
            })
        }
            else {
                console.log("path not found")
            }
        
        });
        

    module.exports = router;