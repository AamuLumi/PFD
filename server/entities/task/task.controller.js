'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(taskSchema){

    /*
     * Tools methods
     */
    taskSchema.statics.create = function(params, callback) {
        let Self = this;

        params.state = 0;
        params.user = params.userId;

        let sprint = new Self(params);

        sprint.save(callback);
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
            (next) => mongoose.model('Task').create(req.body, next)
        ], (err, sprint) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err)
                Response.insertError(res, err);

            Response.success(res, 'Task added !', sprint);
        });
    };
};