'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
});

require('./project.controller')(userSchema);

module.exports = mongoose.model('User', userSchema);
