'use strict';

let webpack = require('webpack');
let path = require('path');

let lessConstants = require('./constants.json');

module.exports = {
    name: 'browser',
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react',
                    'stage-0'
                ],
                plugins: ['babel-root-import']
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less?{"globalVars":'+ JSON.stringify(lessConstants)+'}'
        }, {
            loader: 'json-loader',
            test: /\.json$/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ],
    entry: path.join(__dirname, '../index') // Your appʼs entry point
};
