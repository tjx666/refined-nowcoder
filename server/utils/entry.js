const { resolve } = require('path');
const fs = require('fs-extra');
const { argv } = require('yargs');
const serverConfig = require('../configs/server');

const srcPath = resolve(__dirname, '../../src');
const serverPath = encodeURIComponent(`http://${serverConfig.HOST}:${serverConfig.PORT}/__webpack_HMR__`);
const HMRClientScript = `webpack-hot-middleware/client?path=${serverPath}&reload=true`;
const entry = {
    background: [HMRClientScript, resolve(srcPath, 'background.ts')],
    options: ['react-hot-loader/patch', HMRClientScript, resolve(srcPath, `options/index.tsx`)],
};

if (argv.devtools) {
    entry.options.unshift('react-devtools');
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    async function startupReactDevtools() {
        let output;
        try {
            output = await exec('npx react-devtools');
        } catch (error) {
            console.error('Startup react-devtools occur error:', error);
            return;
        }

        const { stdout, stderr } = output;
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);
    }
    startupReactDevtools();
}

const entryNames = fs.readdirSync(resolve(srcPath, 'contents'));
entryNames.forEach(name => {
    const contentScriptsAutoReloadPatch = resolve(__dirname, './extensionAutoReloadClient.js');
    entry[name] = [contentScriptsAutoReloadPatch, resolve(srcPath, `contents/${name}/index.ts`)];
});

module.exports = entry;
