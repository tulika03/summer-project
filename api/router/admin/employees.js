const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('./../../models/employee');
const bcrypt = require('bcrypt');

// env file has been added
require('./../../../env');

router.post('/addEmployee', (req, res, next) => {
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

    router.get('/view', (req, res,next) => {
        Employee.find()
        .exec()
        .then(result => {
            if(result.length > 0) {
                res.status(200).json({result});
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
    router.get('/view/:employee_id', (req, res,next) => {
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

    router.patch('/update/:employeeId',(req, res, next) => {
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

        router.delete('/delete/:employeeId', (req,res,next) => {
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

    module.exports = router;