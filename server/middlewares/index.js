const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackMiddleware(compiler, publicPath) {
    const options = {
        publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        stats: {
            colors: true,
            children: false,
            chunks: false,
            modules: false,
        },
        writeToDisk: true,
    };

    return webpackDevMiddleware(compiler, options);
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
};
