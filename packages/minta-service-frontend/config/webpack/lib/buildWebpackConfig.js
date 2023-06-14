const buildPlugins = require('./buildPlugins')
const buildLoaders = require('./buildLoaders')
const buildResolvers = require('./buildResolvers')
const buildDevServer = require('./buildDevServer')

module.exports = (options) => {
  const { paths, mode, isDev } = options

  return {
    mode,
    entry: ['@babel/polyfill', paths.entry],
    output: {
      filename: '[name].bundle.js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
