const merge = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
    mode: 'production',
};

module.exports = merge.smart(common, devConfig);
