const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    name: 'js',
    entry: {
        '/dist/payframe/payframe': './src/payframe/payframe.js',
        '/dist/checkout/checkout': './src/checkout/checkout.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname),
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "sass-loader" }
                    ],
                    fallback: 'style-loader'

                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?context=./src/&name=/[path][name].[ext]'
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({filename: '[name].css'}),
        new CopyWebpackPlugin(
            [
                { from: './src/checkout/checkout.html', to: './dist/checkout/' },
                { from: './src/checkout/images', to: './dist/checkout/images/' },
                { from: './src/appConfig.json', to: './dist/' }
            ],
            { debug: 'warning' }
        ),
        new WriteFilePlugin()

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 7050
    }
};