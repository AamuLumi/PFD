'use strict';

let express = require('express');
let Project = require('mongoose').model('Project');

let router = express.Router();

router.post('/', Project.exCreate);

console.log('route created !');

module.exports = router;