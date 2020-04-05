// const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATH_SRC = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './build/prod');

module.exports = merge(common, {
  mode: 'production',
  entry: [path.join(PATH_SRC, './index.js')],
  output: {
    path: PATH_DIST,
    filename: 'js/[name].[hash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
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
    // Enabling below increases build size above 390KB
    // new DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: 'production',
    //   },
    // }),
  ],
});
