const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const common = require('./webpack.common');

const projectRoot = resolve(__dirname, '../../');

module.exports = merge.smart(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyPlugin([
            { from: resolve(projectRoot, 'public'), ignore: ['*.html'] },
            { from: resolve(projectRoot, 'src/manifest.dev.json'), to: 'manifest.json' },
        ]),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: false,
        }),
    ],
});
