'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let kanbanSchema = new Schema({
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint'
    }
});

require('./kanban.controller')(kanbanSchema);

module.exports = mongoose.model('Kanban', kanbanSchema);