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
            (next) => Self.findOne({_id: params.id}, next),
            (userStory, next) => {
                if (!userStory)
                    next('No user story found !');
                else
                    Self.update({_id: params.id}, {$set: params}, next);
            }
        ], (err, userStory) => {
            if (err)
                callback(err);

            callback(null, userStory);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForEditPriority(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.id) {
            Response.missing(res, 'id', -11);
        } else if (!req.body.priority) {
            Response.missing(res, 'priority', -12);
        } else {
            parametersOK = true;
        }

        if (parametersOK) {
            callback();
        } else {
            callback({
                alreadySent: true
            });
        }
    }

    /*
     * Express calls
     */
    userStorySchema.statics.exEditPriority = function(req, res) {
        async.waterfall([
            (next) => checkParametersForEditPriority(req, res, next),
            (next) => mongoose.model('User_Story').edit(req.body, (err) => {
                if (err) {
                    Response.editError(res, err);
                    next({
                        alreadySent: true
                    });
                }
            })
        ], (err, userStory) => {
            if (err && err.alreadySent)
                return;

            Response.success(res, 'Priority of the US is modified !', userStory);
        });
    };
};