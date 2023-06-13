const path=require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports={
    entry: path.resolve(__dirname, '..', 'src', 'index.js'),
    mode: "production",
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle',
        library: "ui-kit",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".jsx", ".js"]
    },
    externals: {
        react: "react"
    }
}