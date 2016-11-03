'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    kanban: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kanban'
    },
    userStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Story'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

require('./project.controller')(projectSchema);

module.exports = mongoose.model('Project', projectSchema);