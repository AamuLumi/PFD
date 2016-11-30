'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(taskSchema){

    /*
     * Tools methods
     */
    taskSchema.statics.delete = function(params, callback) {
        mongoose.model('Task').find({_id: params.id}).remove(function(err, removed){
            if (err)
                callback(err);

            callback(null, removed);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForDelete(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.id) {
            Response.missing(res, 'id', -11);
        } else {
            parametersOK = true;
        }

        /*
         * TODO: Check user perms to delete US
         */

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
    taskSchema.statics.exDelete = function (req, res) {
        async.waterfall([
            (next) => checkParametersForDelete(req, res, next),
            (next) => mongoose.model('Task').delete(req.body, next)
        ], (err, task) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'Task deleted !', task);
        });
    };
};