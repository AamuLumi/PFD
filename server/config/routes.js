'use strict';

let Errors = require('../tools/routes/errors');
let fs = require('fs');
let express = require('express');
let path = require('path');

module.exports = function (app, config) {

    let files = fs.readdirSync(config.root + '/entities');

    // Require all entities
    for (let file of files) {
        // Load models
        require('../entities/' + file + '/' + file + '.model');

        // Load routes
        app.use('/api/' + file, require('../entities/' + file + '/' + file + '.route'));
    }

    // All api/something go on 404 error if not found
    app.route('/api/:url(api)/*').get(Errors[404]);

    app.use('/static/', express.static(config.appPath + '/static'));

    app.get('*', function(req, res) {
        res.sendFile(config.appPath + '/index.html');
    });
};