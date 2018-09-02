const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  entry: {
  	'pageA': './test/pageA',
    'pageB': './test/pageB',
    'vendor': ['lodash']
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
  	rules: [{
  		test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
  	}]
  },
  plugins: [
    new CleanWebpackPlugin('dist/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunks: ['pageA', 'pageB']
    })
  	// new webpack.optimize.UglifyJsPlugin()
  ]
}