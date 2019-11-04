/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import Path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const srcDir = Path.resolve(__dirname, '../src');

const config: webpack.Configuration = {
    entry: {
        background: Path.resolve(srcDir, 'background.ts'),
        all: Path.resolve(srcDir, 'contents/all/index.ts'),
        discuss: Path.resolve(srcDir, 'contents/discuss/index.ts'),
        popup: Path.resolve(srcDir, 'pages/popup/index.tsx'),
        options: Path.resolve(srcDir, 'pages/options/index.tsx'),
    },
    output: {
        publicPath: '/',
        path: Path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    },
    devtool: 'eval-source-map',
    devServer: {
        port: 3000,
        contentBase: './dist',
        hot: true,
        disableHostCheck: true,
        stats: 'minimal',
        writeToDisk: filePath => {
            return true;
        },
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
                    MiniCssExtractPlugin.loader,
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
            title: 'Refined Nowcoder - 选项与帮助',
            template: Path.resolve(__dirname, '../public/options.html'),
            inject: 'body',
            minify: false,
        }),
        new CopyPlugin([
            { from: Path.resolve(__dirname, '../public'), ignore: ['*.html'] },
            { from: Path.resolve(__dirname, '../src/manifest.json') },
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    resolve: {
        alias: {
            '@': srcDir,
            utils: Path.resolve(srcDir, './utils'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default config;
