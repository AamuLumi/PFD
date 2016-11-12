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

        let userStory = new Self(params);

        userStory.save(callback);
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
        } else if (!req.body.number) {
            Response.missing(res, 'number', -13);
        } else if (!req.body.priority) {
            Response.missing(res, 'priority', -14);
        } else if (!req.body.effort) {
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

            if (err)
                Response.insertError(res, err);

            Response.success(res, 'USer story created !', userStory);
        });
    };
};