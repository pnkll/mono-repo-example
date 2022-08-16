const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const pathe = 

module.exports = {
    //откуда брать сборку
    entry: ["@babel/polyfill", path.resolve(__dirname,'../src/index.jsx')],
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
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
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
    }
}