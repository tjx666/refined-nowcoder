const fs = require('fs-extra');
const { resolve } = require('path');

const srcPath = resolve(__dirname, '../../src');
const entry = {};

const entryDirs = ['contents', 'pages'];
entryDirs.forEach(dir => {
    const entryNames = fs.readdirSync(resolve(srcPath, dir));
    entryNames.forEach(name => {
        entry[name] = resolve(srcPath, `${dir}/${name}/index.${dir === 'contents' ? 'ts' : 'tsx'}`);
    });
});

const extraEntry = {
    background: resolve(srcPath, 'background.ts'),
};

Object.assign(entry, extraEntry);

module.exports = entry;
