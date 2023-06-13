module.exports = (options) => {
  const { mode, port } = options
  return {
    port,
    historyApiFallback: true,
    allowedHosts: 'all',
    // https: true,
  }
}
