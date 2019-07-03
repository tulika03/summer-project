const mongoose = require('mongoose');
const boardSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    board_name:{
        type:String,
        required:true
    },
    board_description: {
        type:String,
        required:true
    },
    created_on: {
        type: Date,
        required: true
    },
     board_created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports =  mongoose.model('Board',boardSchema);