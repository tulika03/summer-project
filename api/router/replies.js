const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Comment = require('./../models/comment')
const Employee = require('./../models/employee')
const Reply = require('./../models/reply')
const checkAuth = require('./../middleware/checkAuth')
require('./../../env')

// view details of all zones


//view comment by comment_id
router.get('/viewCommentReply/:comment_id', checkAuth, (req, res, next) => {
    Reply.find({ reply_to_comment: req.params.comment_id })
        .populate('reply_to_comment')
        .populate('reply_by_employee')
        .populate('reply_to_comment.comment_by_employee')
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
router.get('/viewReply/:replyId', checkAuth, (req, res, next) => {
    Reply.find({ _id: req.params.replyId })
    .populate('reply_by_employee')
    .populate('reply_to_comment')
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
router.post('/addReply', checkAuth, (req, res, next) => {
    Employee.findById(req.body.reply_by_employee).then(output => {
        Comment.findById(req.body.reply_to_comment).then(data => {
            const replyData = new Reply({
                _id: new mongoose.Types.ObjectId(),
                reply_desc: req.body.reply_desc,
                reply_date: Date.now(),
                reply_by_employee: req.body.reply_by_employee,
                reply_to_comment: req.body.reply_to_comment
            })
            return replyData
                .save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'data for reply added successfully.... ',
                        createdReply: result
                    })
                }).catch(err => {
                    console.log(err, "Comment id not found....");
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
router.delete('/deleteReply/:replyId', checkAuth, (req, res, next) => {
    const id = req.params.replyId;
    Reply.findOneAndRemove({ _id: id })
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
