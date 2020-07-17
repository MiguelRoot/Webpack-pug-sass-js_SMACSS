const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const chokidar = require('chokidar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const BASE_DIR = __dirname;
const pages = ["index"];

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        before(app, server) {
            chokidar.watch([
                './src/views/**/*.pug'
            ]).on('all', function () {
                server.sockWrite(server.sockets, 'content-changed');
            })
        }
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(BASE_DIR, 'src')
                        }
                    },
                    {
                        loader: "markdown-loader",
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                            basedir: path.resolve(BASE_DIR, 'src/views')
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compresed'
                        }
                    },
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            names: ["app"],
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin()
    ].concat(
        pages.map(page =>
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                template: path.resolve(BASE_DIR, "src/views/pages", `${page}.pug`)
                // data: require(`./src/content/home.json`)
            })
        )
    )

})