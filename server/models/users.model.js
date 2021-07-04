// Dependancies
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// User Schema
const userSchema = new Schema({
    phone: {
        type: String,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    skey: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);