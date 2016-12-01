'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(taskSchema){

    /*
     * Tools methods
     */
    taskSchema.statics.setState = function(params, callback) {
        mongoose.model('Task').findById(params._id, (err, task) => {
            if (err)
                return callback(err);

            task.state = params.state;

            task.save(callback);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForSetState(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body._id) {
            Response.missing(res, 'Task id (_id)', -11);
        } else if (!req.body.state) {
            Response.missing(res, 'State', -12);
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
    taskSchema.statics.exSetState = function (req, res) {
        async.waterfall([
            (next) => checkParametersForSetState(req, res, next),
            (next) => mongoose.model('Task').setState(req.body, next)
        ], (err, task) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'User assigned !', task);
        });
    };
};