const webpack = require('webpack')
const PurifyWebpack = require('purifycss-webpack')
const HtmlInlinkChunkPliugin = require('html-webpack-inline-chunk-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const glob = require('glob-all')
function resolve (dir) {
  return path.join(__dirname, dir)
}
mosule.exports = {
  plugins: [
    new PurifyWebpack({
      paths: glob.sync([
        resolve('./*.html'),
        resolve('./src/*.js')
      ])
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HtmlInlinkChunkPliugin({
      inlineChunks: ['manifest']
    }),
    new Webpack.optimize.uglifyJS(),
    new CleanWebpackPlugin(['dist'])
  ]
}