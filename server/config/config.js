'use strict';

let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

let config = {
    development: {
        root: rootPath,
        app: {
            name: 'pfd-api-dev'
        },
        port: 15400,
        secret: 'development-session-pfd'
    },

    test: {
        root: rootPath,
        app: {
            name: 'nuitinfo-api-test'
        },
        port: 15400,
        secret: 'test-session-pfd'
    },

    production: {
        root: rootPath,
        app: {
            name: 'nuitinfo-api'
        },
        port: 15400,
        secret: 'prod-session-pfd'
    }
};

module.exports = config[env];