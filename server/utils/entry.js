const fs = require('fs-extra');
const { resolve } = require('path');
const serverConfig = require('../configs/server');

const srcPath = resolve(__dirname, '../../src');
const serverPath = `http://${serverConfig.HOST}:${serverConfig.PORT}/__webpack_HMR__`;
const HMRClientScript = `webpack-hot-middleware/client?path=${encodeURIComponent(serverPath)}&reload=true`;
const entry = {
    background: [HMRClientScript, resolve(srcPath, 'background.ts')],
};

const entryDirs = ['contents', 'pages'];
entryDirs.forEach(dir => {
    const entryNames = fs.readdirSync(resolve(srcPath, dir));
    entryNames.forEach(name => {
        if (dir === 'contents') {
            entry[name] = resolve(srcPath, `${dir}/${name}/index.ts`);
        } else {
            entry[name] = [HMRClientScript, resolve(srcPath, `${dir}/${name}/index.tsx`)];
        }
    });
});

module.exports = entry;
