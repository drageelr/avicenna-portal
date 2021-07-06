// Dependancies
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const optionSchema = new Schema ({
    content: {
        type: String,
        required: true
    }
});

// Poll Schema
const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        optionSchema
    ],
    creatorPhone: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        active: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Poll', pollSchema);