'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(traceabilitySchema){

    /*
     * Tools methods
     */
    traceabilitySchema.statics.create = function(params, callback) {
        let Self = this;

        let trace = new Self(params);

        trace.save(callback);
    };

    traceabilitySchema.statics.getAll = function(params, callback) {
        mongoose.model('Traceability')
            .find()
            .exec(callback);
    };

    /*
     * Verification methods
     */
    function checkParametersForCreate(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.userStoryID) {
            Response.missing(res, 'user story id (userStoryID)', -11);
        } else if (!req.body.link) {
            Response.missing(res, 'Link', -12);
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
    traceabilitySchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Traceability').create(req.body, next)
        ], (err, traceability) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'Traceability added !', traceability);
        });
    };

    traceabilitySchema.statics.exGetAll = function (req, res) {
        mongoose.model('Traceability').getAll({}, (err, traces) => {
            if (err)
                return Response.selectError(res, err);

            if (!traces || traces.length === 0)
                return Response.resourceNotFound(res, 'traces');

            Response.success(res, 'Traces found !', traces);
        });
    };
};