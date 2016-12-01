'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(kanbanSchema){

    /*
     * Tools methods
     */
    kanbanSchema.statics.setSprint = function(params, callback) {
        mongoose.model('Project').findById(params.projectID, (project, err) => {
            if (err || !project)
                return callback(err);


            project.kanban.sprint = params.sprintID;

            project.save(callback);
        });
    };

    kanbanSchema.statics.create = function (callback) {
        let Self = this;

        let kanban = new Self({});

        kanban.save(callback);
    };

    /*
     * Verification methods
     */
    function checkParametersForSetSprint(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body.projectID) {
            Response.missing(res, 'projectID', -11);
        } else if (!req.body.sprintID) {
            Response.missing(res, 'sprintID', -12);
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
    kanbanSchema.statics.exSetSprint = function (req, res) {
        async.waterfall([
            (next) => checkParametersForSetSprint(req, res, next),
            (next) => mongoose.model('Kanban').setSprint(req.params, next)
        ], (err, kanban) => {
            if (err && err.alreadySent)
                return;

            if (err)
                return Response.insertError(res, err);

            Response.success(res, 'Kanban updated !', kanban);
        });
    };
};