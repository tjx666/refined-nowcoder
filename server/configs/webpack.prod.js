const { resolve } = require('path');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// FIXME: HardSourceWebpackPlugin has a bug "can not freeze node_modules/.../lib" in development, so, now can only be used in production
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const common = require('./webpack.common');

const projectRoot = resolve(__dirname, '../../');
const smp = new SpeedMeasurePlugin();

const prodConfig = merge.smart(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new BundleAnalyzerPlugin(),
        new CopyPlugin([
            { from: resolve(projectRoot, 'public'), ignore: ['*.html', '**/vendor/**'] },
            { from: resolve(projectRoot, 'src/manifest.prod.json'), to: 'manifest.json' },
        ]),
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            cache: true,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new HardSourceWebpackPlugin({ info: { level: 'error' } }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});

module.exports = smp.wrap(prodConfig);
