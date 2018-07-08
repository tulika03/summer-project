const mongoose = require('mongoose');

const zoneSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    zone_name:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('Zone',zoneSchema);