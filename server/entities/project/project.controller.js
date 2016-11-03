'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(projectSchema)
{
    // Tools methods
    projectSchema.statics.create = function(params, callback)
    {
        let Self = this;

        params.kanban = null;
        params.user_stories = [];

        let project = new Self(params);

        project.save(callback);
    };

    // Verifications methods
    function checkParametersForCreate(req, res, callback)
    {
        let parametersOk = false;

        if (!req.body || !req.body.name)
        {
            return Response.missing(res, 'name', -11);
        }
        else if (!req.body.description)
        {
            return Response.missing(res, 'description', -12);
        }
        else
        {
            parametersOk = true;
        }

        if (parametersOk)
        {
            callback();
        }
        else
        {
            callback({
                alreadySent: true
            });
        }
    }

    // Express calls
    projectSchema.statics.exCreate = function(req, res)
    {
        async.waterfall([
            (next) => checkParametersForCreate(req, res, next),
            (next) => mongoose.model('Project').create(req.body, next)
        ], (err, project) => {
            if (err && err.alreadySent)
            {
                return;
            }

            if (err && err.code == Response.MongoCodes.alreadyExist)
                return Response.alreadyExist(res, 'none');
            else if (err)
                return Response.insertError(res, err);

            return Response.success(res, 'Project added', project);
        });
    };
};