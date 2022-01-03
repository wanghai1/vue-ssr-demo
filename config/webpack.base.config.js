const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', ".css"],
    alias: {
    	'@':path.resolve(__dirname,"../src"), // 配置路径缩写 
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ['vue-style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        include: path.resolve(__dirname, '../src'),
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,  //小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          },
        },
        generator: {
          filename: 'images/[base]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ],

  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filname: '[name]-budle.js', // 用于长效缓存
  //   publicpath: '/assets/', // 输出解析文件的目录，url 相对于 HTML 页面
  //   clear: true //  等于 clean-webpack-plugin 自动清理目录
  // },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
}