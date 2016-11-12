'use strict';

let express = require('express');
let userStory = require('mongoose').model('User_Story');
let passport = require('passport');

let router = express.Router();

router.post('/delete', userStory.exDelete);

module.exports = router;