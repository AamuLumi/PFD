'use strict';

let server = undefined;

module.exports = function() {
    beforeEach(function () {
        server = require('../../app.js');
    });
    afterEach(function () {
        server.close();
    });
};