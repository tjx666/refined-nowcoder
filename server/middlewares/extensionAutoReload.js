const SseStream = require('ssestream');
const fs = require('fs-extra');
const Path = require('path');

module.exports = function extensionAutoReload(compiler) {
    const middleware = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        const sseStream = new SseStream(req);
        sseStream.pipe(res);

        compiler.hooks.done.tapPromise('extension-auto-reload-plugin', stats => {
            return new Promise((resolve, reject) => {
                const { modules } = stats.toJson({ all: false, modules: true });
                const contentScriptsEntries = fs.readdirSync(Path.resolve(__dirname, '../../src/contents'));
                const contentScriptsChange =
                    modules && modules.length === 1 && contentScriptsEntries.includes(modules[0].chunks[0]);
                if (contentScriptsChange) {
                    console.log('Send chrome extension reload signal!');
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
                } else {
                    resolve();
                }
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
