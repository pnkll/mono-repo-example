const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const path=require('path')

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
    }
})