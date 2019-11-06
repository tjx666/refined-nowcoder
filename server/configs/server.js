const { argv } = require('yargs');

module.exports = {
    HOST: argv.HOST || process.env.HOST || '127.0.0.1',
    PORT: Number(argv.PORT || process.env.PORT || '3000'),
};
