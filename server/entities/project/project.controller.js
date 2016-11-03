'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function (projectSchema) {
    // Tools methods
    projectSchema.statics.create = function (params, callback) {
        let Self = this;

        params.kanban = null;
        params.userStories = [];

        let project = new Self(params);

        project.save(callback);
    };

    projectSchema.statics.edit = function (params, callback) {
        let Self = this;

        console.log(params);

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (project, next) => {
                if (!project)
                    next('No project found !');
                else
                    Self.update({_id: params._id}, {$set: params}, next);
            }
        ], (err, project) => {
            if (err)
                return callback(err);

            callback(null, project);
        });
    };

    // Verifications methods
    function checkParametersForCreate(req, res, callback) {
        let parametersOk = false;

        if (!req.body || !req.body.name) {
            return Response.missing(res, 'name', -11);
        } else if (!req.body.description) {
            return Response.missing(res, 'description', -12);
        } else {
            parametersOk = true;
        }

        if (parametersOk) {
            callback();
        } else {
            callback({
                alreadySent: true
            });
        }
    }

    // Express calls
    projectSchema.statics.exCreate = function (req, res) {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Project').create(req.body, next)
        ], (err, project) => {
            if (err && err.alreadySent) {
                return;
            }

            if (err && err.code === Response.MongoCodes.alreadyExist)
                return Response.alreadyExist(res, 'none');
            else if (err)
                return Response.insertError(res, err);

            return Response.success(res, 'Project added', project);
        });
    };

    projectSchema.statics.exEdit = function (req, res) {
        /*
         TODO: Wait for authentication to enable this code !
         if (!req.isLogged())
            return Response.notAllowed(res);
         */

        mongoose.model('Project').edit(req.body, (err) => {
            if (err)
                return Response.editError(res, err);

            return Response.success(res, 'Edit successfull', {});
        });
    };
};