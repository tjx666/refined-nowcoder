const SseStream = require('ssestream');
const fs = require('fs-extra');
const Path = require('path');
const { debounce } = require('lodash');

module.exports = function extensionAutoReload(compiler) {
    const middleware = function(req, res, next) {
        console.log('SSE client connected!');
        res.header('Access-Control-Allow-Origin', '*');
        const sseStream = new SseStream(req);
        let closed = false;
        sseStream.pipe(res);

        // 防抖处理
        const callback = debounce(stats => {
            const { modules } = stats.toJson({ all: false, modules: true });
            const contentScriptsEntries = fs.readdirSync(Path.resolve(__dirname, '../../src/contents'));
            const contentScriptsChange =
                modules && modules.length === 1 && contentScriptsEntries.includes(modules[0].chunks[0]);
            if (contentScriptsChange) {
                console.log('Send chrome extension reload signal!');
                sseStream.write(
                    {
                        event: 'compiled',
                        data: 'reload-extension',
                    },
                    'UTF-8',
                    error => {
                        if (error) {
                            console.error(error);
                        }
                    }
                );
            }
        }, 1500);

        // 断开链接后之前的 hook 就不要执行了
        const plugin = stats => !closed && callback(stats);
        compiler.hooks.done.tap('extension-auto-reload-plugin', plugin);

        res.on('close', () => {
            closed = true;
            console.log('SSE connection closed!');
            sseStream.unpipe(res);
        });

        next();
    };
    return middleware;
};
