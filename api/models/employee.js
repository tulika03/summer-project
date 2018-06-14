const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_Id: {
        type: String,
        required: true
    },
    employee_firstName: {
        type: String,
        required: true
    },
    employee_LastName: {
        type: String
    },
    employee_contact: {
        type: Number,
        required: true,
        unique: true
    },
    employee_username: {
        type: String
    },
    employee_email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    employee_password: {
        type: String,
        required: true
    },
    employee_resetPasswordToken: String,
    employee_resetPasswordExpires: String
});

module.exports =  mongoose.model('User',userSchema);
