const { resolve } = require('path');
const { HashedModuleIdsPlugin } = require('webpack');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            cache: true,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false,
            }),
        ],
    },
});

module.exports = smp.wrap(prodConfig);
