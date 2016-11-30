'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sprintSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

require('./sprint.controller')(sprintSchema);

module.exports = mongoose.model('Sprint', sprintSchema);