'use strict';

let express = require('express');
let Kanban = require('mongoose').model('Kanban');
let passport = require('passport');

let router = express.Router();

router.put('/', Kanban.exSetSprint);

module.exports = router;