'use strict';

let express = require('express');
let Sprint = require('mongoose').model('Sprint');
let passport = require('passport');

let router = express.Router();

router.put('/', Sprint.exEdit);

module.exports = router;