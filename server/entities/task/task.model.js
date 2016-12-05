'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    state: {
        /*
         * Values:
         *  0 -> Waiting
         *  1 -> Doing
         *  2 -> Done
         */
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

require('./task.controller')(taskSchema);

module.exports = mongoose.model('Task', taskSchema);