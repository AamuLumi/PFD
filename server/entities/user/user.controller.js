'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (projectSchema) {
    // Verification tools
    projectSchema.statics.exists = function(req, res, callback) {
        let Self = this;

        if (!req.body || !req.body._id)
            return Response.missing(res, 'ID', -11);

        async.waterfall([
            (next) => Self.findOne({'_id': req.body._id}, next),
            (user, next) => {
                if (!user)
                    next('No user found !');
                else
                    next();
            }
        ], (err) => {
            if (err)
                return callback(err);

            callback();
        });
    };
};