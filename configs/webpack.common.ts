/* eslint-disable import/no-extraneous-dependencies */
import Path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const srcDir = Path.resolve(__dirname, '../src');
const entry: webpack.Entry = {
    background: 'background.ts',
    all: 'contents/all/index.ts',
    discuss: 'contents/discuss/index.ts',
    popup: 'pages/popup/index.tsx',
    options: 'pages/options/index.tsx',
};
Object.entries(entry).forEach(([name, path]) => {
    if (typeof path === 'string') {
        entry[name] = Path.resolve(srcDir, path);
    }
});

const config: webpack.Configuration = {
    entry,
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
        stats: {
            children: false,
            chunks: false,
            modules: false,
        },
        writeToDisk: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
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
        new ForkTsCheckerWebpackPlugin(),
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
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
};

export default config;
