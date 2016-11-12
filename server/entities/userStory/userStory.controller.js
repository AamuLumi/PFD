'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(userStorySchema){

    /*
     * Tools methods
     */
    userStorySchema.statics.getAll = function(params, callback) {
        mongoose.model('User_Story')
            .find()
            .exec(callback);
    };

    /*
     * Express calls
     */
    userStorySchema.statics.exGetAll= function(req, res) {
        mongoose.model('User_Story').getAll({}, (err, userStory) => {
            if (err)
                return Response.selectError(res, err);

            if (!userStory || userStory.length === 0)
                return Response.resourceNotFound(res, 'userStory');

            Response.success(res, 'User stories found !', userStory);
        });
    };
};