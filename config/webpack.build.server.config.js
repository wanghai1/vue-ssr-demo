// 生成 vue-ssr-server-bundle.json 存放资源的映射信息
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');


module.exports = merge(baseConfig, {
  entry: {
    'erver': path.resolve(__dirname,'../src/entry-server.js')
  },
  target: 'node',
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ],
  externals: [nodeExternals({
    allowlist: /\.css$/
  })],
  optimization: {
    splitChunks: false
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  }
})