const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const entry = require('../utils/entry');

const projectRoot = resolve(__dirname, '../../');

module.exports = {
    entry,
    output: {
        publicPath: '/',
        path: resolve(projectRoot, 'dist'),
        filename: 'js/[name].js',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { constLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [autoprefixer({})],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [autoprefixer({})],
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            // use modifyVars to custom antd theme
                            modifyVars: {},
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [autoprefixer({})],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            chunks: ['options'],
            title: 'Refined Nowcoder - 选项与帮助',
            template: resolve(projectRoot, 'public/options.html'),
            inject: 'body',
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ForkTsCheckerWebpackPlugin({ memoryLimit: 1024 }),
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': resolve(projectRoot, 'src'),
            utils: resolve(projectRoot, 'src/utils'),
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
};
