const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Zone = require('./../models/zone');

// view details of all zones

router.get('/viewZone', (req, res,next) => {
    Zone.find()
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

//view entry of a Zone
router.get('/viewZone/:zone_Id', (req, res,next) => {
    Zone.find({zone_Id: req.params._id})
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

module.exports = router;
