/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import Path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const srcDir = Path.resolve(__dirname, '../src');

const config: webpack.Configuration = {
    entry: {
        background: Path.resolve(srcDir, 'pages/background/index.ts'),
        popup: Path.resolve(srcDir, 'pages/popup/index.tsx'),
        options: Path.resolve(srcDir, 'pages/options/index.tsx'),
    },
    output: {
        publicPath: '/',
        path: Path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        writeToDisk: filePath => {
            return /^(?!.+(?:hot-update.(js|json))).+$/.test(filePath);
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
        new CopyPlugin([
            { from: Path.resolve(__dirname, '../public'), ignore: ['*.html'] },
            { from: Path.resolve(__dirname, '../src/manifest.json') },
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default config;
