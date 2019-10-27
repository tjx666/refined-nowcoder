/* eslint-disable import/no-extraneous-dependencies */
// const Path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
    mode: 'development',
};

module.exports = merge.smart(common, devConfig);
