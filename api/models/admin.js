const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    admin_firstName: {
        type: String,
        required: true
    },
    admin_lastName:  {
        type: String,
        required: true
    },
    admin_username:  {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
     },
    admin_password : {
        type: String,
        required: true
    },
    resetPasswordToken : String,
    resetPasswordExpires : String
});

module.exports =  mongoose.model('Admin', adminSchema);