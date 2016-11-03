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

    projectSchema.statics.addUser = function (params, callback) {
        let Self = this;

        async.waterfall([
            (next) => Self.findOne({'_id': params._id}, next),
            (project, next) => {
                if (!project)
                    next('No project found !');
                else
                    Self.update({_id: params._id}, {$push: {users: params.userId}}, next);
            }
        ], (err, project) => {
            if (err)
                return callback(err);

            callback(null, project);
        });
    };

    projectSchema.statics.getById = function(params, callback) {
        mongoose.model('Project')
            .findById(params.id)
            .exec(callback);
    };

    projectSchema.statics.getAll = function(params, callback) {
        mongoose.model('Project')
            .find()
            .exec(callback);
    };

    // Verifications methods
    function checkParametersForCreate(req, res, callback) {
        let parametersOk = false;

        if (!req.body || !req.body.name) {
            Response.missing(res, 'name', -11);
        } else if (!req.body.description) {
            Response.missing(res, 'description', -12);
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
                return Response.alreadyExist(res, 'name');
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

    projectSchema.statics.exRegister = function (req, res) {
        async.waterfall([
            (next) => {
                let parametersOK = false;

                if (!req.body || !req.body.userId)
                    Response.missing(res, 'userId', -11);
                else
                    parametersOK = true;

                if (parametersOK) {
                    let params = req.body;
                    params._id = req.body.userId;
                    mangoose.model('User').exists(params, res, next);
                }
                else
                    next({
                        alreadySent: true
                    });
            },
            (next) => mangoose.model('Project').addUser(req.body, next)
        ], (err, project) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            return Response.success(res, 'User added', project);
        });
    };

    projectSchema.statics.exGet = function(req, res) {
        mongoose.model('Project').getById(req.params, (err, project) => {
            if (err)
                return Response.selectError(err);

            if (!project)
                return Response.resourceNotFound(res, 'project');

            Response.success(res, 'Project found !', project);
        });
    };

    projectSchema.statics.exGetAll = function (req, res) {
        mongoose.model('Project').getAll({}, (err, projects) => {
            if (err)
                return Response.selectError(err);

            if (!projects || projects.length === 0)
                return Response.resourceNotFound(res, 'projects');

            Response.success(res, 'Projects found !', projects);
        });
    };
};