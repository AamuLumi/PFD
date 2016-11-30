'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (sprintSchema) {

    /* Tool methods */
    sprintSchema.statics.edit = function(params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (sprint, next) => {
                if (!sprint)
                    next('No sprint found !');
                else
                    Self.update({_id: params._id}, {$set: params}, next);
            }
        ], (err, sprint) => {
            if (err)
                return callback(err);

            callback(null, sprint);
        });
    };

    /* Controllers methods */

    /* Express methods verifications */

    /* Express calls */
    sprintSchema.statics.exEdit = function (req, res) {
        mongoose.model('Sprint').edit(req.body, (err, sprint) => {
            if (err)
                return Response.insertError(res, err);

            return Response.success(res, 'Sprint modified !', sprint);
        });
    };
};