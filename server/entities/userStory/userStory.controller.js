'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(userStorySchema){
    /*
     * Tools methods
     */
    userStorySchema.statics.edit = function(params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (userStory, next) => {
                if (!userStory)
                    next('No user story found !');
                else
                    Self.update({_id: params._id}, {$set: params}, next);
            }
        ], (err, userStory) => {
            if (err)
                return callback(err);

            callback(null, userStory);
        });
    };

    /*
     * Express calls
     */
    userStorySchema.statics.exEdit = function(req, res) {
        mongoose.model('User_Story').edit(req.body, (err, userStory) => {
            if (err)
                Response.insertError(res, err);

            return Response.success(res, 'User story modified !', userStory);
        });
    };
};