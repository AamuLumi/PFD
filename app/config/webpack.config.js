'use strict';

let webpack = require('webpack');
let path = require('path');

console.log(__dirname);

module.exports = {
    devtool: 'eval',
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:9080',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, '../index')
    ],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
