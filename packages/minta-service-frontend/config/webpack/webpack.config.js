const buildWebpackConfig = require('./lib/buildWebpackConfig')
const path = require('path')
const dotenv = require('dotenv')

module.exports = ({ port, env }, { mode }) => {
  const paths = {
    entry: path.resolve(__dirname, '..', '..', 'src', 'index.jsx'),
    html: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
    // output: path.resolve(__dirname, '../dist'),
    // build: '/var/www/build',
    build: path.resolve(__dirname, '..', '..', 'build'),
    src: path.resolve(__dirname, '..', '..', 'src'),
    _: path.resolve(__dirname, '..', '..'),
  }

  const PORT = port || 3010

  const isDev = mode === 'development'

  dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) })

  const config = buildWebpackConfig({
    mode,
    isDev,
    port: PORT,
    paths,
  })

  return config
}
