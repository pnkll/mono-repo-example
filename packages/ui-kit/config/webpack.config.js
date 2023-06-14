const path=require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports={
    entry: path.resolve(__dirname, '..', 'src', 'index.js'),
    mode: "production",
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.js',
        library: "ui-kit",
        libraryTarget: "umd",
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },{
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            }
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