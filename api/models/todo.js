const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todo_title: {
        type: String,
        required: true
    },
    todo_status: {
        type: String,
        required: true
    },
    todo_priority: {
        type: String,
        required: true
    },
    todo_message: {
        type: String,
        required: true
    },
    todo_createdBy_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    todo_createdBy_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    todo_cc_user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    todo_cc_admin:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    todo_assignedTo_user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    todo_assignedTo_admin:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    todo_checklist:[{
        type:String
    }],
    todo_dueDate:{
        type:Date,
        required:true
    },
    todo_Jobsite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobsite',
        required: true
    },
    todo_attachment:{
        type: String
    }
});

module.exports =  mongoose.model('Todo',todoSchema);