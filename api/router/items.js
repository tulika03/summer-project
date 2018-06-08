const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Item = require('./../models/item');

// refernced schemas
const Choice = require('./../models/choice');
const Category = require('./../models/category');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/items');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});

// get choice list for items
router.get('/choiceList', (req,res,next) => {
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

//get categoriesliat for items
router.get('/categoryList', (req, res, next) => {
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


// add new item
router.post('/addItem', upload.single('item_file'), (req, res, next) => {
   var choiceList = req.body.choiceId.split(' '); 
   console.log("choice list: "+choiceList)
   console.log("requested file: " + req.file)
    Category.findById(req.body.categoryId)
    .exec()
   .then(output => {
        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            item_title: req.body.item_title,
            item_description: req.body.item_description,
            item_file: "http://localhost:3002/uploads/items/"+req.file.originalname,
            item_allowence: req.body.item_allowence,
            category: req.body.item_categoryId,
            choices: choiceList
            
        })
        return item
            .save()
    })
    .then( result => {
        console.log(result);
         res.status(201).json({
            message: 'data for item added successfully.... ',
            createditem: result
        })
    })
    .catch(err => {
         console.log(err);
         res.status(500).json({error: err})
    });    
});

// view all the items details

router.get('/viewItem', (req, res, next) => {
     Item.find()
    .populate({
        path: 'choices category'
    })
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

router.get('/viewItems', (req, res, next) => {
     Item.find()
    .populate({
        path: 'choices category'
    })
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

// view item detail by id

router.get('/viewItem/:itemId', (req,res,next) => {
    Item.findById(req.params.itemId)
    .populate({
        path: 'choices category'
    })
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

//update items details

router.patch('/updateItem/:itemId', (req, res, next) => {
    var choiceList = req.body.choiceId.split(' '); 
    console.log("choice list: "+choiceList)
    console.log(req.files)
    const id = req.params.itemId;
    Item.update({_id: id}, {$set: {
             item_title: req.body.item_title,
             item_description: req.body.item_description,
           //  item_file: "http://localhost:3002/uploads/items/"+req.file.originalname,
             item_allowence: req.body.item_allowence,
             category: req.body.item_categoryId,
             choices: choiceList
        }  
    })
    .exec()
     .then( result => {
         console.log(result);
          res.status(200).json({
             message: 'data for item updated successfully.... ',
             createditem: result
         })
     })
     .catch(err => {
          console.log(err);
          res.status(500).json({error: err})
     });    
 });
 

 // change item's file

 router.patch('/updateFile/:itemId', upload.single('item_file'), (req,res,next) => {
    console.log(req.file)
    const id = req.params.itemId;
    
    if(req.file.path) {
            Item.update({_id: id}, {$set: {
                item_file: "http://localhost:3002/uploads/items/"+req.file.originalname
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

// delete an item

router.delete('/deleteItem/:itemId', (req, res, next) => {
    const id = req.params.itemId;
    Item.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
        console.log(result);
        res.status(200).json({
        message: 'You have deleted the item details' + result
         })
    })
    .catch(err => {console.log(err);
        res.status(500).json({error: err })
    });
});

module.exports = router;