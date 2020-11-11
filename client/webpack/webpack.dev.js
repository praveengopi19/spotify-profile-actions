const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
var common = require('./webpack.common')

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js",
        publicPath: '/'
    }
})