const path = require('path')
const BASE_DIR = __dirname;

module.exports = {
    entry: {
        'app': './src/main.js'
    },

    resolve: {
        alias: {
            "js": path.resolve(BASE_DIR, "src/js"),
            "views": path.resolve(BASE_DIR, "src/views"),
            "scss": path.resolve(BASE_DIR, "src/scss"),
            "img": path.resolve(BASE_DIR, "src/img"),
            "node_modules": path.resolve(BASE_DIR, "node_modules")
        },
        extensions: ["*", ".js", ".scss", ".pug"]
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: './assets/img/[hash].[ext]',
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: './assets/fonts/[hash].[ext]',
                            limit: 50000
                        }
                    }
                ]
            }
        ]

    }

}