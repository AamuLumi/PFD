'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(kanbanSchema){

    /*
     * Tools methods
     */
    kanbanSchema.statics.setSprint = function(params, callback) {
        mongoose.model('Kanban').findById(params._id, (kanban, err) => {
            if (err)
                return callback(err);

            kanban.sprint = params.sprintID;

            kanban.save(callback);
        });
    };

    /*
     * Verification methods
     */
    function checkParametersForCreate(req, res, callback) {
        let parametersOK = false;

        if (!req.body || !req.body._id) {
            Response.missing(res, 'id', -11);
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