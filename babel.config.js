/* eslint-disable import/no-dynamic-require, global-require */

module.exports = api => {
    const isProd = api.env('production');
    const manifest = require(`./src/manifest.${isProd ? 'prod' : 'dev'}.json`) || {};
    const chromeVersion = manifest.minimum_chrome_version || 'last 2 Chrome versions';
    const envPreset = [
        '@babel/env',
        {
            targets: { chrome: chromeVersion },
            useBuiltIns: 'usage',
            corejs: 3,
        },
    ];

    const importPlugin = [
        'import',
        {
            libraryName: 'antd',
            library: 'lib',
            style: true,
        },
    ];

    return {
        presets: ['@babel/preset-typescript', envPreset],
        plugins: [
            'lodash',
            importPlugin,
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-optional-chaining',
        ],
        env: {
            development: {
                presets: [['@babel/preset-react', { development: true }]],
                plugins: ['react-hot-loader/babel'],
            },
            production: {
                presets: ['@babel/preset-react'],
                plugins: [
                    'babel-plugin-dev-expression',
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
        sourceMaps: true,
        retainLines: true,
    };
};
