const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const path=require('path')
const webpack=require('webpack')

module.exports = merge(common, {
    mode: "development",
    //перезапускает сборку при внесении изменений в файлы
    devServer: {
        port: 3010,
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'API_URL': JSON.stringify('https://restapi.minta365.ru/api')
                // 'API_URL': JSON.stringify('http://87.103.193.156:3000/api')
            }
        })
    ]
})