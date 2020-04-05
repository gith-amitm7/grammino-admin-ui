const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: false,
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              ['@babel/preset-react'],
            ],
          },
        },
      },
    ],
  },
};
