'use strict';

let express = require('express');
let Task = require('mongoose').model('Task');
let passport = require('passport');

let router = express.Router();

router.put('/setState', Task.exSetState);

module.exports = router;