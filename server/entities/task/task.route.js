'use strict';

let express = require('express');
let Task = require('mongoose').model('Task');
let passport = require('passport');

let router = express.Router();

router.put('/assignTo', Task.exAssignTo);

module.exports = router;