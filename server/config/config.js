'use strict';

let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    appPath = path.normalize(__dirname + '/../../app'),
    env = process.env.NODE_ENV || 'development';

let config = {
    development: {
        root: rootPath,
        appPath : appPath,
        app: {
            name: 'pfd-api-dev'
        },
        port: 15400,
        secret: 'development-session-pfd'
    },

    test: {
        root: rootPath,
        appPath: appPath,
        app: {
            name: 'nuitinfo-api-test'
        },
        port: 15400,
        secret: 'test-session-pfd'
    },

    production: {
        root: rootPath,
        appPath: appPath,
        app: {
            name: 'nuitinfo-api'
        },
        port: 15400,
        secret: 'prod-session-pfd'
    }
};

module.exports = config[env];