const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_SRC = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './build/dev');

module.exports = merge(common, {
  mode: 'development',
  entry: [path.join(PATH_SRC, './index.js')],
  output: {
    path: PATH_DIST,
    filename: 'js/[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC + '/public', './index.html'),
    }),
    new CopyPlugin([
      {
        from: PATH_SRC + '/public',
        to: PATH_DIST + '/public',
        ignore: ['index.html'],
      },
    ]),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATH_DIST,
    host: 'localhost',
    port: 8080,
    // When using the HTML5 History API (you'll probably do this with React
    // later), index.html should be served in place of 404 responses.
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});
