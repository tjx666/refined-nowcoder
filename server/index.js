const express = require('express');
const chalk = require('chalk');
const webpackDevConfig = require('./configs/webpack.dev');
const addDevMiddleWares = require('./middlewares');
const serverConfig = require('./configs/server');

const app = express();
addDevMiddleWares(app, webpackDevConfig);

app.listen(serverConfig.PORT, serverConfig.HOST, async error => {
    if (error) {
        console.error('Start server error:', error);
    } else {
        console.log(`Server started ! ${chalk.green('✓')}`);
        const address = chalk.green.underline(`http://${serverConfig.HOST}:${serverConfig.PORT}`);
        console.log(`Access address: ${address}`);
    }
});

process.addListener('uncaughtException', error => {
    console.error(error);
});
