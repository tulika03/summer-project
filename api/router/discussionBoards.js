const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Board = require('./../models/discussionModel')
const Employee = require('./../models/employee')
const checkAuth = require('./../middleware/checkAuth')
require('./../../env')

// view details of all zones

router.get('/viewBoards', checkAuth, (req, res,next) => {
    Board.find()
    .populate('board_created_by')
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

//view entry of a Zone
router.get('/viewBoard/:board_Id', checkAuth, (req, res,next) => {
    Board.find({_id:req.params.board_Id})
    .populate("board_created_by")
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: 'board entry not found....'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

// add board
router.post('/addBoard',checkAuth, (req, res, next) => {
    Employee.findById(req.userData._id)
    .then(output => {
        console.log(req.userData)
        const boardData = new Board({
            _id: new mongoose.Types.ObjectId(),
            board_name: req.body.board_name,
            board_description: req.body.board_description,
            created_on: Date.now(),
            board_created_by: req.userData._id
        })
        return boardData
            .save()
    })
    .then( result => {
        console.log(result);
     res.status(201).json({
        message: 'data for board added successfully.... ',
        createdboard: result
    })
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err})
    
    });
});



// update or edit Board field
router.patch('/editBoard/:boardId', checkAuth, (req, res, next) => {
    Board.findById(req.params.boardId)
    .then(output => {
        const id = req.params.boardId;
        Board.update(
            { _id: id},
            {$set: {
            board_name: req.body.board_name,
            board_description: req.body.board_description,
        }
    }) 
        .exec()       
    })
    .then(result => {
        res.status(200).json({
            message: 'board Data updated successfully...',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })      

});


//delete board 
router.delete('/deleteBoard/:boardId',checkAuth, (req,res,next) => {
    const id = req.params.boardId;
    Board.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
        console.log(result);
        res.status(200).json({
        message: 'You have deleted the Board' + result
         })
    })
    .catch(err => {console.log(err);
        res.status(500).json({error: err })
    });
});

    
module.exports = router;
