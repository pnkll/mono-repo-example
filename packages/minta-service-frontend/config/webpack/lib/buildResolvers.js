const path = require('path')

module.exports = (options) => {
  const { paths } = options
  return {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    preferAbsolute: true,
    modules: [options.paths._, 'node_modules'],
    alias: {
      // pages: path.join(paths.src, '/pages'),
      // features: path.join(paths.src, '/features'),
      // widgets: path.join(paths.src, '/widgets'),
      // entities: path.join(paths.src, '/entities'),
      // shared: path.join(paths.src, '/shared'),
      // app: path.join(paths.src, '/app'),
      // '@src': paths.src,
      // '@pages': path.join(paths.src, '/pages'),

      shared: path.join(paths.src, '/shared'),
      entities: path.join(paths.src, '/entities'),
      features: path.join(paths.src, '/features'),
      widgets: path.join(paths.src, '/widgets'),
      app: path.join(paths.src, '/app'),
      pages: path.join(paths.src, '/pages'),
      processes: path.join(paths.src, '/processes'),

      __: path.join(paths._),

      // '@public': path.join(paths._, '/public'),
      // '@widgets': path.join(paths.src, '/widgets'),
      // '@shared': path.join(paths.src, '/shared'),
    },
  }
}
