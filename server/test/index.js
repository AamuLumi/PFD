'use strict';

let fs = require('fs');
let async = require("async");

function loadModelsAndRemoveDocuments(callback) {
    let files = fs.readdirSync('./entities');

    async.forEach(files, function (file, done) {
        require('../entities/' + file + '/' + file + '.model.js').remove({}, done);
    }, callback);
}


function runTests(name, tests) {
    describe(name, function () {
        after(function (done) {
            /* Drop all documents */
            loadModelsAndRemoveDocuments(done);
        });

        tests();
    });
}

describe('Tuviens - Test API', function () {
    runTests('Controllers', require('./controllers'));
    runTests('Routes', require('./routes'));
});

