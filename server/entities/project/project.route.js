'use strict';

let express = require('express');
let Project = require('mongoose').model('Project');
let passport = require('passport');

let router = express.Router();

router.post('/', Project.exCreate);
router.put('/', Project.exEdit);

console.log('route created !');

module.exports = router;