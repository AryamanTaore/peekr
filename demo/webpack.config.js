const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html' // ✅ FIXED: don't read from dist
    })
  ],
  devServer: {
    static: path.resolve(__dirname, 'public'), // ✅ Serve index.html and assets
    open: true
  },
  experiments: {
    topLevelAwait: true
  },
  ignoreWarnings: [
    {
      module: /peekr\/dist\/worker-.*\.js$/,
      message: /Critical dependency: require function/,
    },
    {
      message: /Circular dependency between chunks/,
    },
  ],
};
