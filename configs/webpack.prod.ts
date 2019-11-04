/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';

const devConfig: webpack.Configuration = {
    mode: 'production',
};

module.exports = merge.smart(common, devConfig);
