'use strict';

let express = require('express');
let Traceability = require('mongoose').model('Traceability');
let passport = require('passport');

let router = express.Router();

router.post('/', Traceability.exCreate);
router.get('/', Traceability.exGetAll);

module.exports = router;