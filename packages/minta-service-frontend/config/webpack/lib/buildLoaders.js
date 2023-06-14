const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (options) => {
  const { isDev } = options

  const fileLoader = {
    test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/,
    use: ['file-loader'],
  }
  const sassLoader = {
    test: /\.(css|scss|sass)$/,
    use: [
      isDev ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: true,
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            exportLocalsConvention: 'camelCase',
          },
        },
      },
      'sass-loader',
      // 'less-loader',
    ],
  }
  const babelLoader = {
    test: /\.(m?js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          [
            '@babel/preset-react',
            {
              // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
              // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
              throwIfNamespace: false, // defaults to true
              runtime: 'automatic', // defaults to classic
              // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
              useSpread: 'true',
            },
          ],
        ],
      },
    },
  }
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const lessLoader = {
    test: /\.less$/,
    include: /node_modules/,
    exclude: ['./src+'],
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          // javascriptEnabled: true,
          // plugins: [new CleanCSSPlugin({ advanced: true })],
          // modifyVars: CssVariablesKebabCase,
        },
      },
    ],
  }

  return [fileLoader, babelLoader, tsLoader, sassLoader]
}
