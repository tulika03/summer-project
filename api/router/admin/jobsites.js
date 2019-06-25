const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Jobsite = require('./../../models/jobsite');
const checkAuth = require('./../../middleware/checkAuth')
require('./../../../env')

// refernced schema
const Zone = require('./../../models/zone');
const Employee = require('./../../models/employee');

// add new Jobsite

router.post('/addJobsite', checkAuth, (req, res, next) => {
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
            job_zone:req.body.job_zone
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

router.patch('/editJobsite/:jobsiteId', checkAuth, (req, res, next) => {
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


// update or edit Jobsite zone field

router.patch('/editJobsiteZones/:jobsiteId', checkAuth, (req, res, next) => {
    Zone.findById(req.body.job_zone)
    .then(output => {
        const id = req.params.jobsiteId;
        console.log(id)
        Jobsite.update({ _id: id},{$set: {
            job_zone: req.body.job_zone
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
router.patch('/editJobsiteEmployees/:jobsiteId', checkAuth, (req, res, next) => {
    Employee.findById(req.body.job_employee)
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
router.delete('/deleteJobsite/:jobsiteId',checkAuth, (req,res,next) => {
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


//get all jobsites
router.get('/viewJobsite', checkAuth, (req, res,next) => {
    Jobsite.find({}) 
    .populate({
       path: 'job_employee job_zone'
    })   
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
        console.log(err)
        error: err
    });
});

//view entry of a Jobsite
router.get('/viewJobsite/:jobsite_Id', checkAuth, (req, res,next) => {
    Jobsite.findById({_id:req.params.jobsite_Id})
    .populate({
        path: 'job_employee job_zone'
    })
    .exec()
    .then(result => {
        console.log(result.length)
       // if(result.length > 0)
      //  {
            res.status(200).json(result)
       // }
       /* else {
            res.status(404).json({
                message: 'entry not found....'
            })
        }*/
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});



module.exports = router;