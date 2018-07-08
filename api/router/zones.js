const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Zone = require('./../models/zone')
const checkAuth = require('./../middleware/checkAuth')
require('./../../env')

// view details of all zones

router.get('/viewZone', checkAuth, (req, res,next) => {
    Zone.find()
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

//view entry of a Zone
router.get('/viewZone/:zone_Id', checkAuth, (req, res,next) => {
    Zone.find({_id:req.params.zone_Id})
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
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;
