const express = require('express');
const router = express.Router();
const Category = require('./../../models/category');

const mongoose = require('mongoose');

// add new category

router.post('/addCategory', (req, res, next) => {
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        category_id: req.body.category_id,
        category_name: req.body.category_name
    });
    category.save()
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

//get all categories list

router.get('/viewCategory', (req, res, next) => {
    Category.find()
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json({
                result
            })
        }
        else {
            res.status(404).json({
                message: 'No details found...',
                data: result
            })
        }
    })

    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

// get details of a paricular order

router.get('/viewCategory/:categoryId', (req, res,next) => {
    Category.find({_id: req.params.categoryId})
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json({
                result
            })
        }
        else {
            res.status(404).json({
                message: 'No data found...',
                result: result
            })
        }
    })

    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


// update or edit details

router.patch('/editCategory/:categoryId', (req, res, next) => {
        const id = req.params.categoryId;
        console.log(categoryId)
        Category.update({ _id: id},{$set: {
                category_id: req.body.category_id,
                category_name: req.body.category_name
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

// delete the category

router.delete('/delete/:categoryId', (req, res,next) => {
    const id = req.params.categoryId;
    Category.findOneAndRemove({_id: id })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Data deleted for category....'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;