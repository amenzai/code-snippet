const webpack = require('webpack')
mosule.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 2019,
    overlay: true,
    proxy: {
      '/': {
        target: 'https://test.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/comments': './api/comments'
        },
        headers: {
          'Cookie': 'xxxxxx'
        }
      }
    }
  },
  hot: true,
  hotOnly: true,
  historyApiFallback: {
    rewrites: [{
      from: /\A/,
      to: function(context) {
        return '/' + context.match[1]
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NameModulesPlugin(),
  ]
}