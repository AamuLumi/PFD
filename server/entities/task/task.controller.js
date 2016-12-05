'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (taskSchema) {

    /*
     * Tools methods
     */
    taskSchema.statics.create = function (params, callback) {
        let Self = this;

        params.state = 0;
        params.user = params.userId;

        let sprint = new Self(params);

        sprint.save(callback);
    };

    taskSchema.statics.edit = function(params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (task, next) => {
                if (!task)
                    next('No task found !');
                else
                    Self.update({_id: params._id}, {$set: params}, next);
            }
        ], (err, task) => {
            if (err)
                return callback(err);

            callback(null, task);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForCreate(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.name) {
            Response.missing(res, 'Name', -11);
        } else if (!req.body.description) {
            Response.missing(res, 'Description', -12);
        } else if (!req.body.userId) {
            Response.missing(res, 'User ID', -13);
        } else if (!req.body.userStoryId) {
            Response.missing(res, 'User Story ID', -14);
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
    taskSchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Task').create(req.body, (err, task) => next(err, task)),
            (task, next) => mongoose.model('User_Story').update(
                {_id: req.body.userStoryId},
                {$push: {tasks: task._id}},
                (err) => next(err, task))
        ], (err, task) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.insertError(res, err);
            }

            Response.success(res, 'Task added !', task);
        });
    };

    taskSchema.statics.exEdit = function (req, res) {
        mongoose.model('Task').edit(req.body, (err, task) => {
            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'Task modified !', task);
        });
    };
};