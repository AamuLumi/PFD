'use strict';

let express = require('express');
let Task = require('mongoose').model('Task');
let passport = require('passport');

let router = express.Router();

router.delete('/', Task.exDelete);

module.exports = router;