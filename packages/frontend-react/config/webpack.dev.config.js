const {merge} = require('webpack-merge')
const common = require('./webpack.common.config')

module.exports = merge(common,{
    mode: "development",
    //перезапускает сборку при внесении изменений в файлы
    devServer: {
        port: 3010
    },
    output: {
        
    }
})