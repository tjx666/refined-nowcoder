const fs = require('fs-extra');
const { resolve } = require('path');
const serverConfig = require('../configs/server');

const srcPath = resolve(__dirname, '../../src');
const serverPath = encodeURIComponent(`http://${serverConfig.HOST}:${serverConfig.PORT}/__webpack_HMR__`);
const HMRClientScript = `webpack-hot-middleware/client?path=${serverPath}&reload=true`;
const entry = {
    background: [HMRClientScript, resolve(srcPath, 'background.ts')],
};

const entryDirs = ['contents', 'pages'];
entryDirs.forEach(dir => {
    const entryNames = fs.readdirSync(resolve(srcPath, dir));
    entryNames.forEach(name => {
        if (dir === 'contents') {
            // const contentScriptsAutoReloadPatch = resolve(__dirname, './extensionAutoReloadPatch.js');
            // entry[name] = [contentScriptsAutoReloadPatch, resolve(srcPath, `${dir}/${name}/index.ts`)];
            entry[name] = resolve(srcPath, `${dir}/${name}/index.ts`);
        } else {
            entry[name] = ['react-hot-loader/patch', HMRClientScript, resolve(srcPath, `${dir}/${name}/index.tsx`)];
        }
    });
});

module.exports = entry;
