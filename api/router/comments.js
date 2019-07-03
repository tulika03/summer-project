const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Comment = require('./../models/comment')
const Board = require('./../models/discussionModel')
const Employee = require('./../models/employee')
const checkAuth = require('./../middleware/checkAuth')
require('./../../env')

// view details of all zones

router.get('/viewComments', checkAuth, (req, res, next) => {
    Comment.find()
    .populate('comment_by_employee')
    .populate('comment_board')
        .exec()
        .then(result => {
            if (result.length > 0) {
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

//view comment by boardId
router.get('/viewBoardComment/:board_Id', checkAuth, (req, res, next) => {
    Comment.find({ comment_board: req.params.board_Id })
        .populate('comment_by_employee')
        .populate('comment_board')
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({
                    message: 'Comment entry not found....'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

//view comment by comment ID
router.get('/viewComment/:commentId', checkAuth, (req, res, next) => {
    Comment.find({ _id: req.params.commentId })
    .populate('comment_by_employee')
    .populate('comment_board')
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({
                    message: 'Comment entry not found....'
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
router.post('/addComment', checkAuth, (req, res, next) => {
    Employee.findById(req.userData._id).then(output => {
        Board.findById(req.body.comment_board).then(data => {
            const commentData = new Comment({
                _id: new mongoose.Types.ObjectId(),
                comment_desc: req.body.comment_desc,
                comment_date: Date.now(),
                comment_by_employee: req.userData._id,
                comment_board: req.body.comment_board
            })
            return commentData
                .save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'data for comment added successfully.... ',
                        createdboard: result
                    })
                }).catch(err => {
                    console.log(err, "board id not found....");
                    res.status(500).json({ error: err })
                })               
        })
        .catch(err => {
            console.log(err, "Employee id not found...");
            res.status(500).json({ error: err })

        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })

    })
})

//delete Jobsite 
router.delete('/deleteComment/:commentId', checkAuth, (req, res, next) => {
    const id = req.params.commentId;
    Comment.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'You have deleted the Board' + result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});


module.exports = router
