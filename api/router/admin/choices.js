const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Choice = require('./../../models/choice');
const Category = require('./../../models/category')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/choices');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});

// add new choice 
router.post('/addChoice', upload.any(), (req, res, next) => {
    Category.findById(req.body.categoryId)
    .then(output => {
        console.log(output + " " + req.files)
        const choice = new Choice({
            _id: new mongoose.Types.ObjectId(),
            choice_code: req.body.choice_code,
            choice_name: req.body.choice_name,
            choice_photo: "http://localhost:3002/uploads/choices/"+req.files[0].originalname,
            choice_length: req.body.choice_length,
            choice_company: req.body.choice_company,
            choice_description: req.body.choice_description,
            choice_file: "http://localhost:3002/uploads/choices/"+req.files[1].originalname,
            choice_status: req.body.choice_status,
            choice_quantity: req.body.choice_quantity,
            choice_unitCost: req.body.choice_unitCost,
            choice_costCode: req.body.choice_costCode,
            category: req.body.categoryId
        })
        return choice
            .save()
    })
    .then( result => {
        console.log(result);
     res.status(201).json({
        message: 'data for choice added successfully.... ',
        createdchoice: result
    })
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err})
    
    });
    
    });
    

    // view all choices

    router.get('/viewChoice', (req,res,next) => {
        Choice.find()
        .populate('category')
        .exec()
        .then(doc => {
        console.log(doc)
    if(doc.length >= 0)
    {
        res.status(200).json({
            message: 'Data fetched successfully for all choices.....',
            doc: doc
        })
    }
    else
    {
        res.status(404).json({message: 'No entries found....'})
    }
    })
    .catch(err => {
        console.log(err)
    res.status(500).json({
        error: err
    })
    })
    });

    // view by id

    router.get('/viewChoice/:choiceId', (req,res,next) => {
        Choice.findById(req.params.choiceId)
        .exec()
        .then(doc => {
        console.log("from database" + doc)
        if(doc) {
            res.status(200).json(doc)
        }
        else
        {
            res.status(404).json({message: 'no valid entry found for provided id...'})
        }
    
        })
        .catch(err => {console.log(err);
            res.status(500).json({error: err })
        });
    });

    // update the choice

    router.patch('/update/:choiceId' , (req,res,next) => {
        console.log(req.files)
        const id = req.params.choiceId;
        Choice.update({_id: id}, {$set: {
            choice_code: req.body.choice_code,
            choice_name: req.body.choice_name,
            choice_length: req.body.choice_length,
            choice_company: req.body.choice_company,
            choice_description: req.body.choice_description,
            choice_status: req.body.choice_status,
            choice_quantity: req.body.choice_quantity,
            choice_unitCost: req.body.choice_unitCost,
            choice_costCode: req.body.choice_costCode,
            category: req.body.categoryId
            }
        })
            .exec()
            .then(result => {
            res.status(200).json({
            message: 'You have updated choice details by ID ' + id,
            result: result
        });
        })
        .catch(err => {
            res.status(500).json(err)
        })
        });
    // change image of choice

    router.patch('/updateImage/:choiceId', upload.single('choice_photo'), (req,res,next) => {
        console.log(req.file)
        const id = req.params.choiceId;
        
        if(req.file.path) {
                Choice.update({_id: id}, {$set: {
                    choice_photo: "http://localhost:3002/uploads/choices/"+req.file.originalname
                    }
                })
                .exec()
                .then(result => {
                    res.status(200).json({
                    message: 'You have updated choice file for ID ' + id
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
    
    // change choice file

    router.patch('/updateFile/:choiceId', upload.single('choice_file'), (req,res,next) => {
        console.log(req.file)
        const id = req.params.choiceId;
        
        if(req.file.path) {
                Choice.update({_id: id}, {$set: {
                    choice_file: "http://localhost:3002/uploads/choices/"+req.file.originalname
                    }
                })
                .exec()
                .then(result => {
                    res.status(200).json({
                    message: 'You have updated choice file for ID ' + id
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
    

    //delete choice details

    router.delete('/delete/:choiceId', (req,res,next) => {
        const id = req.params.choiceId;
        Choice.findOneAndRemove({_id: id})
            .exec()
            .then(result => {
            console.log(result);
            res.status(200).json({
            message: 'You have deleted the choice details' + result
             })
        })
        .catch(err => {console.log(err);
            res.status(500).json({error: err })
        });
    });
module.exports = router;