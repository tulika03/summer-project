const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    category_id: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model('Category', categorySchema);