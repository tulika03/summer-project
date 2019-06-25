const mongoose = require('mongoose');

const jobsiteSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    job_name:{
        type:String,
        required:true
    },
    job_client_name:{
        type:String,
        required:true
    },
    job_client_address:{
        type:String,
        required:true
    },
    job_client_contact:{
        type:String,
        required:true
    },
    job_client_email:{
        type:String,
        required:true
    },
    job_client_city:{
        type:String,
        required:true
    },
    job_zone:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Zone', required: true
    }],
    job_employee:[{
       type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }]
});
 
module.exports =  mongoose.model('Jobsite',jobsiteSchema);