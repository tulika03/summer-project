const mongoose = require('mongoose');

const replySchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reply_desc:{
        type:String,
        required:true
    },  
    reply_date: {
        type: Date,
        required: true
    },
    reply_by_employee:{
       type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    reply_to_comment:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true
     }    
});
 
module.exports =  mongoose.model('Reply',replySchema);