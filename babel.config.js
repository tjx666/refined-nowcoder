module.exports = function(api) {
    api.cache(true);

    const envPreset = [
        '@babel/env',
        {
            targets: {
                browsers: ['last 2 version', 'Firefox ESR', '> 1%', 'ie >= 9'],
            },
            useBuiltIns: 'usage',
            corejs: 3,
        },
    ];

    const presets = ['@babel/preset-typescript', '@babel/preset-react', envPreset];

    const importPlugin = [
        'import',
        {
            libraryName: 'antd',
            library: 'lib',
            style: true,
        },
    ];

    const plugins = [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-runtime',
        'react-hot-loader/babel',
        'lodash',
        importPlugin,
    ];

    return { presets, plugins };
};
