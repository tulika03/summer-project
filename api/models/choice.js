const mongoose = require('mongoose');
const choiceSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    choice_code: {
        type: String,
        required: true
    },
    choice_name: {
        type: String,
        required: true
    },

    choice_photo: {
        type: String,
        required: true
    },
    choice_length: {
        type: Number
    },
    choice_company: {
        type: String
    },

    choice_description: {
        type: String
    },
    choice_file: {
        type: String,
        required: true
    },

    choice_status: {
        type: String,
        required: true
    },

    choice_quantity: {
        type: Number,
        required: true
    },

    choice_unitCost: {
        type: Number
    },

    choice_costCode: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    }

});

module.exports = mongoose.model('Choice', choiceSchema)