const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Todo = require('./../models/todo');
const checkAuth = require('./../middleware/checkAuth')
require('./../../env')

// refernced schema
const Jobsite = require('./../models/jobsite');
const Employee = require('./../models/employee');
const Admin = require('./../models/admin');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/todos');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});


//add new todo 
router.post('/addTodo', upload.any(), checkAuth, (req, res, next) => {
    Jobsite.findById(req.body.todo_Jobsite)
    .then(output => {  
        if(req.body.todo_createdBy_user.length>0 && Employee.findById(req.body.todo_createdBy_user))
        {
            //Created by user
            if((req.body.todo_cc_user.length >0 && req.body.todo_cc_admin.length >0) && (Employee.find(req.body.todo_cc_user) && Admin.find(req.body.todo_cc_admin)))
            {
                //Created by user
                //cc user and cc admin
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by user
                    //cc user and cc admin
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by user
                    //cc user and cc admin
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by user
                    //cc user and cc admin
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
            else if(req.body.todo_cc_user.length >0 && Employee.find(req.body.todo_cc_user))
            {
                //Created by user
                //cc user only
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by user
                    //cc user only
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by user
                    //cc user only
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by user
                    //cc user only
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
            else if(req.body.todo_cc_admin.length >0 && Admin.find(req.body.todo_cc_admin))
            {
                //Created by user
                //cc admin only
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by user
                    //cc admin only
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by user
                    //cc admin only
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by user
                    //cc admin only
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        todo_createdBy_user: req.body.todo_createdBy_user,
                        //todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
        }
        else if(req.body.todo_createdBy_admin && Admin.findById(req.body.todo_createdBy_admin))
        {
            //Created by admin
            if((req.body.todo_cc_user.length >0 && req.body.todo_cc_admin.length >0) && (Employee.find(req.body.todo_cc_user) && Admin.find(req.body.todo_cc_admin)))
            {
                //Created by admin
                //cc user and cc admin
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by admin
                    //cc user and cc admin
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by admin
                    //cc user and cc admin
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by admin
                    //cc user and cc admin
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                         todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
            else if(req.body.todo_cc_user.length >0 && Employee.find(req.body.todo_cc_user))
            {
                //Created by admin
                //cc user only
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by admin
                    //cc user only
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by admin
                    //cc user only
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by admin
                    //cc user only
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        todo_cc_user: req.body.todo_cc_user,
                        // todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
            else if(req.body.todo_cc_admin.length >0 && Admin.find(req.body.todo_cc_admin))
            {
                //Created by admin
                //cc admin only
                if((req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user)) && (req.body.todo_assignedTo_admin.length >0 && Admin.find(req.body.todo_assignedTo_admin)))
                {
                    //Created by admin
                    //cc admin only
                    //assigned to user and admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_user.length >0 && Employee.find(req.body.todo_assignedTo_user))
                {
                    //Created by admin
                    //cc admin only
                    //assigned to only user
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        // todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
                else if(req.body.todo_assignedTo_admin.length >0 && Employee.find(req.body.todo_assignedTo_admin))
                {
                    //Created by admin
                    //cc admin only
                    //assigned to only admin
                    console.log(output + " " + req.files)
                    const todo = new Todo({
                        
                        _id:mongoose.Types.ObjectId(),                    
                        todo_title: req.body.todo_title,
                        todo_status: req.body.todo_status,
                        todo_priority: req.body.todo_priority,
                        todo_message: req.body.todo_message,
                        //todo_createdBy_user: req.body.todo_createdBy_user,
                        todo_createdBy_admin: req.body.todo_createdBy_admin,
                        //todo_cc_user: req.body.todo_cc_user,
                        todo_cc_admin: req.body.todo_cc_admin,
                        //todo_assignedTo_user:  req.body.todo_assignedTo_user,
                        todo_assignedTo_admin: req.body.todo_assignedTo_admin,
                        todo_checklist: req.body.todo_checklist,
                        todo_dueDate: req.body.todo_dueDate,
                        todo_Jobsite: req.body.todo_Jobsite,
                        todo_attachment: "http://localhost:3002/uploads/todos/"+req.files.originalname
                    })
                    return todo
                        .save()
                }
            }
        }

    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'data inserted successfully....',
            result: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


//get todos in which user is assigned
router.get('/getTodo/:employee_Id', checkAuth, (req,res,next) => {
    Todo.find().where(todo_assignedTo_user==req.param.employee_Id)
    .populate({
        path: 'Jobsite Employee Admin'
    })
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: 'entry not found....'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


//get todos in which admin is assigned
router.get('/getTodo/:Admin_Id', checkAuth, (req,res,next) => {
    Todo.find().where(todo_assignedTo_admin==req.param.Admin_Id)
    .populate({
        path: 'Jobsite Admin Employee'
    })
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: 'entry not found....'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


//get todos in which user is cc
router.get('/getTodo_cc/:employee_Id', checkAuth, (req,res,next) => {
    Todo.find().where(todo_cc_user==req.param.employee_Id)
    .populate({
        path: 'Jobsite Employee Admin'
    })
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: 'entry not found....'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


//get todos in which admin is cc
router.get('/getTodo_cc/:Admin_Id', checkAuth, (req,res,next) => {
    Todo.find().where(todo_cc_admin==req.param.Admin_Id)
    .populate({
        path: 'Jobsite Admin Employee'
    })
    .exec()
    .then(result => {
        if(result.length > 0)
        {
            res.status(200).json(result)
        }
        else {
            res.status(404).json({
                message: 'entry not found....'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


//update status of todo
router.patch('/editTodoStatus/:todoId', checkAuth, (req, res, next) => {
    const id = req.params.todoId;
    console.log(id)
    Todo.update({ _id: id},{$set: {
                todo_status: req.body.todo_status
            }
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Data updated successfully...',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })      

});


module.exports = router;
