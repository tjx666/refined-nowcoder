const SseStream = require('ssestream');
// const { resolve } = require('path');
// const fse = require('fs-extra');

module.exports = function extensionAutoReload(compiler) {
    const middleware = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        const sseStream = new SseStream(req);
        sseStream.pipe(res);

        compiler.hooks.done.tapPromise('extension-auto-reload-plugin', stats => {
            // fse.writeFile(resolve(__dirname, './stats.json'), stats.toString({ all: true }));
            // eslint-disable-next-line no-shadow
            return new Promise((resolve, reject) => {
                const success = sseStream.write(
                    {
                        event: 'compiled',
                        data: 'reload-extension',
                    },
                    'UTF-8',
                    error => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    }
                );

                success && resolve();
            });
        });

        res.on('close', () => {
            console.log('SSE connection closed!');
            sseStream.unpipe(res);
        });

        next();
    };
    return middleware;
};
