const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const checkAuth = require('../../middleware/checkAuth');

const Zone = require('./../../models/zone');

require('./../../../env')
// add new zone

router.post('/addZone', checkAuth, (req, res, next) => {
    const zone = new Zone({
        _id: mongoose.Types.ObjectId(),
        zone_name: req.body.zone_name
    });
    zone.save()
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


// update or edit details

router.patch('/editZone/:zoneId', checkAuth, (req, res, next) => {
        const id = req.params.zoneId;
        console.log(id)
        Zone.update({ _id: id},{$set: {                
                zone_name: req.body.zone_name
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
 
})

// delete the zone

router.delete('/deleteZone/:zoneId', checkAuth, (req, res,next) => {
    const id = req.params.zoneId;
    Zone.findOneAndRemove({_id: id })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Data deleted for zone....'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;