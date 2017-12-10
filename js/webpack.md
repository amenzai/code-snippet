# webpack的简单使用

## 安装
```bash
# 全局安装
npm install - g webpack webpack-dev-server

# 湖或者
# 局部安装
npm install webpack webpack-dev-server --save-dev
```

## package.json示例

```js
// package.json
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
    "build": "NODE_ENV=production webpack -p"
  },
  // ...
}
```

## webpack.config.js示例
```js
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './main.jsx'
  ],
  output: {
    filename: 'bundle.js'
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
      { test: /\.css$/, 
        loader: 'style-loader!css-loader?modules' 
      },
      { test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      }
    ],
    plugins: [
      new uglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlwebpackPlugin({
        title: 'Webpack-demos',
        filename: 'index.html'
      }),
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
```