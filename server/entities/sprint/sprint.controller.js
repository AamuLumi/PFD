'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (sprintSchema) {

    /* Tool methods */
    sprintSchema.statics.create = function(params, callback) {
        let Self = this;

        params.tasks = [];

        let sprint = new Self(params);

        sprint.save(callback);
    };

    sprintSchema.statics.addUS = function(params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (sprint, next) => {
                if (!sprint)
                    next('No sprint found !');
                else
                    mongoose.model('User_Story').findOne({'_id': params.userStoryID}, next);
            },
            (userStory, next) => {
                if (!userStory)
                    next('No US found !');
                else
                    Self.update(
                        {_id: params._id},
                        {$addToSet: {tasks: {$each: userStory.tasks}}},
                        next
                    );
            }
        ], (err, sprint) => {
            if (err)
                return callback(err);

            callback(null, sprint);
        });
    };

    /* Controllers methods */

    sprintSchema.statics.getAll = function(callback){
        mongoose.model('Sprint')
            .find({})
            .exec(callback);
    };

    /* Express methods verifications */
    function checkParametersForCreate(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.name) {
            Response.missing(res, 'Name', -11);
        } else if (!req.body.duration) {
            Response.missing(res, 'Duration', -12);
        } else if (!req.body.beginning) {
            Response.missing(res, 'Beginning', -13);
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

    function checkParametersForAddUS(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body._id)
            Response.missing(res, 'Sprint id (_id)', -11);
        else if (!req.body.userStoryID)
            Response.missing(res, 'User story id (userStoryID)', -12);
        else
            parametersOK = true;

        if (parametersOK)
            callback();
        else
            callback({
                alreadySent: true
            });
    }

    /* Express calls */
    sprintSchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Sprint').create(req.body, next)
        ], (err, sprint) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err) {
                return Response.insertError(res, err);
            }

            Response.success(res, 'Sprint added !', sprint);
        });
    };

    sprintSchema.statics.exGetAll = function (req, res) {
        mongoose.model('Sprint').getAll((err, sprints) => {
            if (err) {
                return Response.selectError(res, err);
            }

            Response.success(res, 'Sprints found', sprints);
        });
    };

    sprintSchema.statics.exAddUS = function (req, res) {
        async.waterfall([
            (next) => checkParametersForAddUS(req, res, next),
            (next) => mongoose.model('Sprint').addUS(req.body, next)
        ], (err, sprint) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'User story added !', sprint);
        });
    };
};
