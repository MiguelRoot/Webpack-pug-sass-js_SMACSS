const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const BASE_DIR = __dirname
const pages = ["index"];

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: "./assets/js/[name].[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(BASE_DIR, 'src'),
                            basedir: path.resolve(BASE_DIR, 'src/views')
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            basedir: path.resolve(BASE_DIR, 'src/views')
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                Autoprefixer()
                            ],
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compresed',
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'node_modules')]
                            }
                        }
                    },
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ]
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            names: ["app"],
            minChunks: Infinity
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: "./assets/css/[name].[contentHash].css" })
    ].concat(
        pages.map(page =>
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(BASE_DIR, "src/views/pages", `${page}.pug`),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        )
    )

})