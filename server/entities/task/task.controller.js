'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(taskSchema){

    /*
     * Tools methods
     */
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

    /*
     * Express calls
     */
    taskSchema.statics.exEdit = function (req, res) {
        mongoose.model('Task').edit(req.body, (err, task) => {
            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'Task modified !', task);
        });
    };
};