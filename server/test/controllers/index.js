'use strict';

let server = undefined;

module.exports = function() {
    beforeEach(function () {
        server = require('../../index.js');
    });
    afterEach(function () {
        server.close();
    });
};