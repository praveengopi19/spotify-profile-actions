const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
var common = require('./webpack.common')

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js",
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../dist'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
        stats: {
            colors: true
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {

                    plugins: [
                        require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                },
            }]
        }]
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ]
})