const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
var common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { loader } = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { runtime } = require('webpack')

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "js/[name].[contentHash].bundle.js",
        publicPath: "/",
        path: path.resolve(__dirname, "../dist")
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "styles/[name].[contentHash].css"
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
})