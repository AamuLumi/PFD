'use strict';

let express = require('express');
let Task = require('mongoose').model('Task');
let passport = require('passport');

let router = express.Router();

router.post('/', Task.exCreate);
router.put('/', Task.exEdit);
router.delete('/', Task.exDelete);
router.put('/assignTo', Task.exAssignTo);
router.put('/setState', Task.exSetState);

module.exports = router;