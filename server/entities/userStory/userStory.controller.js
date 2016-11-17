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
            .find({
                projectID: new mongoose.Types.ObjectId(params.projectID)
            })
            .exec(callback);
    };

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

    userStorySchema.statics.exGetAll= function(req, res) {
        if (!req.params || !req.params.projectID)
            return Response.missing(res, 'projectID', -11);

        mongoose.model('User_Story').getAll(req.params, (err, userStory) => {
            if (err)
                return Response.selectError(res, err);

            if (!userStory || userStory.length === 0)
                return Response.resourceNotFound(res, 'userStory');

            Response.success(res, 'User stories found !', userStory);
        });
    };

    userStorySchema.statics.exEdit = function(req, res) {
        mongoose.model('User_Story').edit(req.body, (err, userStory) => {
            if (err)
                Response.insertError(res, err);

            return Response.success(res, 'User story modified !', userStory);
        });
    };
};