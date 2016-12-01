'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(taskSchema){

    /*
     * Tools methods
     */
    taskSchema.statics.assignTo = function(params, callback) {
        mongoose.model('Task').findById(params._id, (task, err) => {
            if (err)
                return callback(err);

            task.user = params.userID;

            task.save(callback);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForAssignTo(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body._id) {
            Response.missing(res, 'Task id (_id)', -11);
        } else if (!req.body.userID) {
            Response.missing(res, 'User id (userID)', -12);
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
    taskSchema.statics.exAssignTo = function (req, res) {
        async.waterfall([
            (next) => checkParametersForAssignTo(req, res, next),
            (next) => mongoose.model('Task').assignTo(req.body, next)
        ], (err, task) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'User assigned !', task);
        });
    };
};