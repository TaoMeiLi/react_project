const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const serverConfig = require('./dev.server');

module.exports = merge(webpackCommon, {

  entry: {
  	main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.js'
	  ]
  },

  devtool: 'inline-source-map',

  devServer: {
    host: serverConfig.host,
    port: serverConfig.port,
    open: true,
    // hot: true,
    contentBase: [
      resolve(__dirname, 'public'),
      serverConfig.mock_path
    ],
    watchContentBase: false, //防止上传图片到 upload 中引起刷新
    // staticOptions: {
    //   extensions: ['.js', '.html']
    // },
    // watchOptions: {
    //   ignored: resolve(__dirname, 'public/upload/*'),
    // },
    publicPath: '/',
    stats: {
      colors: true,
    },
    proxy: {
      [`${serverConfig.mock_prefix}/*`]: {
        target: `http://${serverConfig.host}:${serverConfig.mock_port}`,
        //target: 'http://jaleel.manager.dev.acewill.net:80',
        //changeOrigin: true,
        proxyTimeout: 30*1000
      }
    },
    historyApiFallback: true
  },

  module: {
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});