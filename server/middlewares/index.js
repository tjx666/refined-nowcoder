const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const extensionAutoReloadMiddleware = require('./extensionAutoReload');

function createWebpackMiddleware(compiler, publicPath) {
    const options = {
        publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        stats: 'minimal',
        writeToDisk: true,
    };

    return webpackDevMiddleware(compiler, options);
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler, { path: '/__webpack_HMR__' }));
    app.use('/__extension_auto_reload_sse__', extensionAutoReloadMiddleware(compiler));
};
