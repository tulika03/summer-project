const mongoose = require('mongoose');

const replySchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment_desc:{
        type:String,
        required:true
    },  
    comment_date: {
        type: Date,
        required: true
    },
    reply_by_employee:[{
       type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    }],
    reply_comment_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true
    }]

    
});
 
module.exports =  mongoose.model('Reply',replySchema);