const { resolve } = require('path');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

const projectRoot = resolve(__dirname, '../../');
const smp = new SpeedMeasurePlugin();

const prodConfig = merge.smart(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new BundleAnalyzerPlugin(),
        new CopyPlugin([
            { from: resolve(projectRoot, 'public'), ignore: ['*.html'] },
            { from: resolve(projectRoot, 'src/manifest.prod.json'), to: 'manifest.json' },
        ]),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                cache: true,
                sourceMap: true,
                comments: false,
            }),
        ],
    },
});

module.exports = smp.wrap(prodConfig);
