// Dependancies
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Poll Ans Schema
const pollAnsSchema = new Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    },
    userPhone: {
        type: String,
        required: true
    },
    optionId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PollAns', pollAnsSchema);