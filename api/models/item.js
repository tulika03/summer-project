const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    item_title: {type: String, required: true},
    item_description: {type: String, required: true},
    item_file: {type: String},
    item_allowence: {type: Number, required: true},
    category: {type: mongoose.Schema.ObjectId, ref: 'Category', required: true},
    choices: [{type: mongoose.Schema.ObjectId, ref: 'Choice', required: true}]
});


module.exports = mongoose.model('Item', itemSchema);