const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = ({ env, paths, isDev }) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CleanWebpackPlugin()
  ]

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    // plugins.push(
    //   new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    //   }),
    // )
  }

  return plugins
}
