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

    /* Controllers methods */

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

    /* Express calls */
    sprintSchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Sprint').create(req.body, next)
        ], (err, sprint) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err)
                Response.insertError(res, err);

            Response.success(res, 'Sprint added !', sprint);
        });
    };
};
