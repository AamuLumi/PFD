'use strict';

let Response = require('../../tools/response');
let mongoose = require('mongoose');
let async = require('async');

module.exports = function(userStorySchema){

    /*
     * Tools methods
     */
    userStorySchema.statics.delete = function(params, callback) {
        mongoose.model('User_Story').find({_id: params.id}).remove(function(err, removed){
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
    userStorySchema.statics.exDelete = function(req, res) {
        async.waterfall([
            (next) => checkParametersForDelete(req, res, next),
            (next) => mongoose.model('User_Story').delete(req.body, next)
        ], (err, userStory) => {
            if (err && err.alreadySent)
                return;

            if (err)
                Response.insertError(res, err);

            Response.success(res, 'User story successfully deleted !', userStory);
        });
    };
};