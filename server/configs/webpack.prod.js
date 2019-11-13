const { resolve } = require('path');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const projectRoot = resolve(__dirname, '../../');

const devConfig = {
    mode: 'production',
    plugins: [
        new CopyPlugin([
            { from: resolve(projectRoot, 'public'), ignore: ['*.html'] },
            { from: resolve(projectRoot, 'src/manifest.prod.json') },
        ]),
    ],
};

module.exports = merge.smart(common, devConfig);
