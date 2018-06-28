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
    job_zone_item:[{
        zone_id:{type:mongoose.Schema.Types.ObjectId, ref:'Zone', required: true},
        items:[{type:mongoose.Schema.Types.ObjectId, ref:'Item'}]
    }],
    job_employee:[{
       type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    }]
});
 
module.exports =  mongoose.model('Jobsite',jobsiteSchema);
