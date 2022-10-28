const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    //откуда брать сборку
    entry: ["@babel/polyfill", path.resolve(__dirname, '../src/index.jsx')],
    output: {
        //куда webpack будет делать сборку проекта
        path: path.resolve(__dirname, '../dist'),
        //имя файла в который будут помещены js файлы
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                exportLocalsConvention: "camelCase",
                            }
                        }
                    },
                    'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            [
                                "@babel/preset-react",
                                {
                                    // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
                                    // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
                                    "throwIfNamespace": false, // defaults to true
                                    "runtime": "automatic", // defaults to classic
                                    // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
                                    "useSpread": "true"
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [path.resolve(__dirname,'../'),'node_modules'],
        alias: {
            '@src': path.resolve(__dirname,'../src'),
            '@components': path.resolve(__dirname,'../src/components'),
            '@services': path.resolve(__dirname,'../src/services'), 
            '@assets': path.resolve(__dirname,'../src/assets'),
            '@hooks': path.resolve(__dirname,'../src/hooks'),
            '@pages': path.resolve(__dirname,'../src/pages'),
            '@store': path.resolve(__dirname,'../src/store'),
            '@forms': path.resolve(__dirname,'../src/forms'),
        }
    },
    devtool: 'inline-source-map'
}