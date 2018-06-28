const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Jobsite = require('./../../models/jobsite');

// refernced schema
const Zone = require('./../../models/zone');
const Item = require('./../../models/item');
const Employee = require('./../../models/employee');

// add new Jobsite

router.post('/addJobsite', (req, res, next) => {
    Zone.find(req.body.zone_id).then(Employee.find(req.body.job_employee))
    .then(output => {
        const jobsite = new Jobsite({
            _id: mongoose.Types.ObjectId(),
            job_name: req.body.job_name,
            job_client_name: req.body.job_client_name,
            job_client_address: req.body.job_client_address,
            job_client_contact: req.body.job_client_contact,
            job_client_email: req.body.job_client_email,
            job_client_city: req.body.job_client_city,
            job_employee: req.body.job_employee,
            job_zone_item:req.body.job_zone_item
        })
        return jobsite
            .save()
    })
    .then(result => {
        res.status(201).json({
            message: 'data inserted successfully....',
            result: result
        })
    })
    .catch(err => {
        console.log(err)
        error: err
    });
});


// update or edit Jobsite 

router.patch('/editJobsite/:jobsiteId', (req, res, next) => {
    const id = req.params.jobsiteId;
    console.log(id)
    Jobsite.update({ _id: id},{$set: {
                job_name: req.body.job_name,
                job_client_name: req.body.job_client_name,
                job_client_address: req.body.job_client_address,
                job_client_contact: req.body.job_client_contact,
                job_client_email: req.body.job_client_email,
                job_client_city: req.body.job_client_city,
            }
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Data updated successfully...',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })      

});


// update or edit Jobsite zone item field

router.patch('/editJobsiteItems/:jobsiteId', (req, res, next) => {
    Zone.find(req.body.zone_id).then(Item.find(req.body.item_id))
    .then(output => {
        const id = req.params.jobsiteId;
        console.log(id)
        Jobsite.update({ _id: id},{$set: {
                job_zone_item: req.body.job_zone_item
                }
        }) 
        .exec()       
    })
    .then(result => {
        res.status(200).json({
            message: 'Data updated successfully...',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })      

});

// update or edit eployee field
router.patch('/editJobsiteEmployees/:jobsiteId', (req, res, next) => {
    Employee.find(req.body.job_employee)
    .then(output => {
        const id = req.params.jobsiteId;
        console.log(id)
        Jobsite.update({ _id: id},{$set: {
                job_employee: req.body.job_employee
                }
        }) 
        .exec()       
    })
    .then(result => {
        res.status(200).json({
            message: 'Data updated successfully...',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })      

});

//delete Jobsite 
router.delete('/deleteJobsite/:jobsiteId', (req,res,next) => {
    const id = req.params.jobsiteId;
    Jobsite.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
        console.log(result);
        res.status(200).json({
        message: 'You have deleted the Jobsite' + result
         })
    })
    .catch(err => {console.log(err);
        res.status(500).json({error: err })
    });
});

module.exports = router;
