const webpack = require('webpack')
const path = require('path')
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  entry: {
  	app: './index.js'
  	// vendor: './vendor.js'
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
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
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    })
  	// new webpack.optimize.UglifyJsPlugin()
  ]
}