const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname,'../src/entry-client.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // port: 8080,
    // static: path.resolve(__dirname,'../dist'),
    // static: {
    //   directory: path.join(__dirname, '../dist'),
    // },
    // static: {
    //   directory: path.join(__dirname, '../dist'),
    // },
    // contentBase: './public',
    compress: true,
    open: true,
    hot: true, // 启用热更新
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
  ],
})