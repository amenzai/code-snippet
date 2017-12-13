# webpack的简单使用

## 安装
```bash
# 全局安装
npm install - g webpack webpack-dev-server

# 或者
# 局部安装
npm install webpack webpack-dev-server --save-dev
```

## package.json示例

```js
// package.json
{
  "name": "react-demo",
  "version": "1.4.1",
  "description": "react-demo",
  "main": "app/main.js",
  "scripts": {
    "build": "webpack --config webpack.production.config.js",
    "start": "webpack-dev-server --devtool eval --progress --hot --content-base app"
  },
  "dependencies": {
    "element-react": "^1.4.4",
    "element-theme-default": "^1.4.12",
    "react": "15.x",
    "react-dom": "15.x",
    "react-router": "^2.8.1"
  },
  "devDependencies": {
    "babel-core": "latest",
    "babel-loader": "latest",
    "babel-preset-es2015": "latest",
    "babel-preset-react": "latest",
    "babel-preset-stage-0": "latest",
    "copy-webpack-plugin": "latest",
    "css-loader": "latest",
    "open-browser-webpack-plugin": "latest",
    "style-loader": "latest",
    "file-loader": "latest",
    "url-loader": "latest",
    "webpack": "latest",
    "webpack-dev-server": "latest"
  },
  "keywords": [
    "es6",
    "web app"
  ],
  "author": "amenzai",
  "license": "MIT"
}
```

## webpack.config.js示例
```js
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devtool:"eval-source-map",
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=100000'
      }, {
        test:/\.(png|jpg|gif|svg)$/,
        loader:"url-loader?limit=8129"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};

```

## webpack.production.config.js示例
```js
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'static/index.html' },
      { from: './app/main.css', to: 'static/main.css' }
    ])
  ]
};

```