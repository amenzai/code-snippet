// webpack-dev-server --env development --open --config build/webpack.common.conf.js
// webpack --env production --config build/webpack.common.conf.js
const path = require('path')
const developmentConfig = require('./webpack.dev.conf.js')
const productionConfig = require('./webpack.prod.conf.js')
const merge = require('webpack-merge')

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const generateConfig = env => {
  const extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-[hash:5]-bundle.css',
    allChunks: false // 默认只打包初始化的，不包含异步的， 设置为true 则依赖全部打包
  })

  const scriptLoader = ['babel-loader'].concat(env === 'production' ? [] : [{
    loader: 'eslint-loader',
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  }])

  const cssLoaders = [{
    loader: 'css-loader',
    options: {
      // minimize: true,
      // modules: true,
      // localIdentName: '[path][name]_[local]--[hash:base64:5]'
      importLoaders: 2,
      sourceMap: env === 'development'
    }
  }, {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: env === 'development',
      plugins: [
        require('autoprefixer')(),
        require('postcss-cssnext')()
      ].concat(env === 'production' ? require('postcss-sprites')({
        spritePath: 'dist/assets/img/sprites',
        retina: true
      }) : [])
    }
  }, {
    loader: 'less-loader',
    options: {
      sourceMap: env === 'development'
    }
  }]

  const styleLoader = env === 'production' ? extractLess.extract({
    fallback: {
      loader: 'style-loader',
      options: {}
    },
    use: cssLoaders
  }) : [{
    loader: 'style-loader'
  }].concat(cssLoaders)

  const fileLoader = env === 'development' ? [{
    loader: 'file-loader',
    options: {
      name: '[name]-[hash:5].[ext]',
      outputPath: 'assets/images/',
    }
  }] : [{
    loader: 'url-loader', // img 转为base64
    options: {
      name: '[name]-[hash:5].[ext]',
      outputPath: 'assets/images/',
      limit: 5000
    }
  }, {
    loader: 'img-loader', 
    options: {
      pngquant: {
        quality: 80
      }
    }
  }]

  return {
    entry: {
      app: '.src/app.js',
    },
    output: {
      path: resolve('../dist'),
      publicPath: '/',
      filename: 'js/[name]-[hash:5]-bundle.js',
      chunkFilename: '[name].chunk.js'
    },
    resolve: {
      alias: {
        jquery$: resolve('../src/libs/jquery.min.js')
      }
    },
    module: {
      rules: [{
        test: /\.less$/,
        use: styleLoader,
      }, {
        test: /\.js$/,
        use: scriptLoader,
        exclude: ['/node_modules/', resolve('src/libs')],
        include: [resolve('src')]
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: fileLoader
      }, {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
          loader: 'url-loader', // img 转为base64
          options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'assets/fonts/',
            limit: 5000
          }
        }]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader', // img 转为base64
          options: {
            attrs: ['img:src', 'img:data-src']
          }
        }]
      }]
    },
    plugins: [
      extractLess,
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        // chunks: ['app'], 只引入这里定义的chunk 
        minify: {
          collapseWhitespace: true
        }
      }),
      new Webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}
module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env), config)
}