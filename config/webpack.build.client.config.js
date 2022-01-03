// vue-ssr-client-manifest.json是对象clientManifest配置项 此对象包含了 webpack 整个构建过程的信息，从而可以让 bundle renderer自动推导需要在HTML模板中注入的内容，从而实现最佳的预加载(preload)和预取(prefetch)资源，
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: {
    'client':  path.resolve(__dirname,'../src/entry-client.js')
  },
  target: 'web',
  mode: 'production',
  plugins: [
    new VueSSRClientPlugin(), // 生成 clientManifest 
  ],
  optimization: {
    splitChunks: false
  },
  output: {
    clean: true
  }
})