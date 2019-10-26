/* eslint-disable import/no-extraneous-dependencies */
const Path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        popup: Path.resolve(__dirname, '../src/popup/index.tsx'),
        options: Path.resolve(__dirname, '../src/options/index.tsx'),
    },
    output: {
        publicPath: '/',
        path: Path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
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
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
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
                // 处理字体文件
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
            {
                // 处理 csv/tsv
                test: /\.(csv|tsv)$/,
                use: [
                    {
                        loader: 'csv-loader',
                        options: {
                            dynamicTyping: true,
                            header: true,
                            skipEmptyLines: true,
                        },
                    },
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: 'xml-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new WriteFilePlugin({ test: /^(?!.+(?:hot-update.(js|json))).+$/ }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup'],
            title: 'popup',
            template: Path.resolve(__dirname, '../public/popup.html'),
            inject: 'body',
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            chunks: ['options'],
            title: 'options',
            template: Path.resolve(__dirname, '../public/options.html'),
            inject: 'body',
            minify: false,
        }),
        new CopyPlugin([{ from: Path.resolve(__dirname, '../public'), ignore: ['*.html'] }]),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
