'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userStorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    traceability: {
        type: String
    },
    priority: {
        type: Number,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    effort: {
        type: Number,
        required: true
    },
    state: {
        /*
         * Values:
         *  0 -> Waiting
         *  1 -> Doing
         *  2 -> Done
         */
        type: Number,
        required: true
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

require('./userStory.controller')(userStorySchema);

module.exports = mongoose.model('User_Story', userStorySchema);