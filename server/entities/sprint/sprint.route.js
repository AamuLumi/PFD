'use strict';

let express = require('express');
let Sprint = require('mongoose').model('Sprint');
let passport = require('passport');

let router = express.Router();

router.post('/', Sprint.exCreate);
router.get('/', Sprint.exGetAll);

module.exports = router;
