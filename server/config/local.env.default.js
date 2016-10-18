'use strict';

/* Rename this file into local.env.js to add the configuration to server */

module.exports = {
    MONGO_HOST: 'localhost',
    MONGO_PORT: 27017,
    MONGO_DB: 'pfdpfd',

    MAIL_SERVICE: 'custom',
    MAIL_ADDRESS: 'email@default.com',
    MAIL_PASSWORD: 'password',

    API_URL: 'http://localhost:8080',
    WEBSERVER_URL: 'http://localhost:8080',

    JWT_SECRET: 'bJC2rlw0IW7FcsV5pWrXvcAK86y9JMD4L3JLB74BBmFJ00heK6yXtXMPDglcrZhl',

    BCRYPT_SALT_ROUNDS: 10
};