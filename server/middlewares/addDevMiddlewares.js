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
        lazy: false,
        stats: {
            all: false,
            modules: true,
            maxModules: 0,
            errors: true,
            warnings: true,
            moduleTrace: true,
            errorDetails: true,
            performance: true,
        },
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
