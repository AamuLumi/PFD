'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let traceabilitySchema = new Schema({
    userStory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Story',
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

require('./traceability.controller')(traceabilitySchema);

module.exports = mongoose.model('Traceability', traceabilitySchema);