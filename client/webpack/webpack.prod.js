const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
var common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
const { runtime } = require('webpack')

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "js/[name].[contentHash].js",
        chunkFilename: "js/[name].[contenthash:8].chunk.js",
        publicPath: "/",
        path: path.resolve(__dirname, "../build")
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "styles/[name].[contentHash].css",
        chunkFilename: "styles/[name].[contenthash:8].chunk.css",
    }), new CompressionPlugin({
        filename(pathData) {
            // The `pathData` argument contains all placeholders - `path`/`name`/`ext`/etc
            // Available properties described above, for the `String` notation
            if (/\.css$/.test(pathData.file)) {
                return "[path][base].gz";
            }


            return "[path][base].gz";
        },
        //filename:"[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html)$/,
        threshold: 9216,
        minRatio: 0.8
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]

    },
    optimization: {
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: {
                condition: /^\**!|@preserve|@license|@cc_on/i,
                filename: (file) => {
                    return file.replace(/\.(\w+)($|\?)/, '.$1.LICENSE.txt$2');
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
})