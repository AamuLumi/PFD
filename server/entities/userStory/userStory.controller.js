'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(userStorySchema){

    /*
     * Tools methods
     */
    userStorySchema.statics.create = function(params, callback) {
        let Self = this;

        params.state = 0;
        params.tasks = [];
        params.traceability = '';

        /*
         * Get the US number from project
         */
        mongoose.model('Project').getById({id: params.projectID}, (err, project) => {
            if (err)
                return callback({
                    selectError: true
                });

            params.number = project.userStories.length + 1;

            let userStory = new Self(params);

            userStory.save((err, res) => {
                if (err)
                    return callback(err);

                project.userStories.push(res._id);

                mongoose.model('Project').edit(project, (err) => {
                    if (err)
                        return callback(err);

                    callback(null, userStory);
                });
            });
        });
    };

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
    function checkParametersForCreate(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.name) {
            Response.missing(res, 'name', -11);
        } else if (!req.body.description) {
            Response.missing(res, 'description', -12);
        } else if (!req.body.projectID) {
            Response.missing(res, 'projectID', -13);
        } else if (req.body.priority === undefined) {
            Response.missing(res, 'priority', -14);
        } else if (req.body.effort === undefined) {
            Response.missing(res, 'effort', -15);
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

    userStorySchema.statics.exCreate = function(req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('User_Story').create(req.body, next)
        ], (err, userStory) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err && err.selectError)
                return Response.selectError(res, err);

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'USer story created !', userStory);
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