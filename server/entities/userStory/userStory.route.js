'use strict';

let express = require('express');
let userStory = require('mongoose').model('User_Story');

let router = express.Router();

router.get('/:projectID', userStory.exGetAll);
router.put('/', userStory.exEdit);
router.put('/priority', userStory.exEditPriority);

module.exports = router;