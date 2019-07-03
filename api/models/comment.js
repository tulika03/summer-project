const mongoose = require('mongoose');

const commentSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment_desc:{
        type:String,
        required:true
    },  
    comment_date: {
        type: Date,
        required: true
    },
    comment_by_employee:{
       type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    comment_board:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true
     }
 

    
});
 
module.exports =  mongoose.model('Comment',commentSchema);