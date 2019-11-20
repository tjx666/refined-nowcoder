const { resolve } = require('path');
const fs = require('fs-extra');
const { argv } = require('yargs');
const serverConfig = require('../configs/server');

const srcPath = resolve(__dirname, '../../src');
const serverPath = encodeURIComponent(`http://${serverConfig.HOST}:${serverConfig.PORT}/__webpack_HMR__`);
const HMRClientScript = `webpack-hot-middleware/client?path=${serverPath}&reload=true`;

const devEntry = {
    background: [HMRClientScript, resolve(srcPath, 'background/index.ts')],
    options: ['react-hot-loader/patch', HMRClientScript, resolve(srcPath, `options/index.tsx`)],
};

const prodEntry = {
    background: [resolve(srcPath, 'background/index.ts')],
    options: [resolve(srcPath, `options/index.tsx`)],
};

const isProd = process.env.NODE_ENV === 'production';
const entry = isProd ? prodEntry : devEntry;

if (argv.devtools) {
    entry.options.unshift('react-devtools');
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    (async function startupReactDevtools() {
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
    })();
}

const contentScriptNames = fs.readdirSync(resolve(srcPath, 'contents'));
contentScriptNames.forEach(name => {
    const existsTsxIndex = fs.existsSync(resolve(srcPath, `contents/${name}/index.tsx`));
    entry[name] = resolve(srcPath, `contents/${name}/index.${existsTsxIndex ? 'tsx' : 'ts'}`);
});

module.exports = entry;
