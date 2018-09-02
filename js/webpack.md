# webpack 深入浅出

## 前言

前端的发展：
- 库 jQuery YUI Prototype
- MVC backboneJs Jquery：前端有路由了
- MV*（MVVM）Vue React angular

CSS的发展：
- Css1
- CSS2
- CSS2.1
- CSS3
- less sass stylus

脚本语言：
- Jscript
  - As coffeScript es6 typeScript
- VBscript
  - JS

环境的变化：
- 客户端浏览器
- node phonegap
- 服务端 浏览器端 移动端（一段代码，多端执行）

社区的变化：
- github
- npm

工具的变化：
- make
- grunt 
- gulp
- fis
- webpack
- rollup.js

为什么前端需要构建？

现在的库专注于解决一个问题，所以各个包很零散，需要将其打包。

- 开发复杂化
- 框架去中心化（框架不会封装太多功能，完全依赖各种各样的包）
- 语言编译化
- 开发模块化

为什么选择webpack？
- Vue-cli/React-starter/Angular-cli 脚手架自带的打包工具
- code-splitting 代码分割
- 天生模块化
- more...

主要内容：
基于webpack3.10、前端整体工作流、前端工程化知识
- 基础知识
  - 前端发展历史
  - 模块化开发
- 文件处理
  - 编译 ES6 / ES7
  - 编译 Typescript
  - 编译 sass / less
  - Postcss 处理浏览器前缀
  - Css nano 压缩css
  - 自动生成 HTML 模板文件
  - 图片压缩和 Base64 编码
  - 自动生成雪碧图
- 开发环境
  - 配置 SourceMap 调试
  - 配置远程接口代理
  - 配置动态 entry 更新
  - 配置模块热更新
  - 配置 ESLint 检查代码格式
- 打包优化
  - 代码分割和懒加载
  - 提取公用代码
  - Tree-shaking
  - 长缓存配置
- 框架配合
  - Vue-cli
  - angular-cli
  - react


## 模块化开发

主流开发都是一个个模块组成的，npm包流行，MVVM框架火热。

### JS模块化
- 命名空间
- COMMONJS
- AMD/CMD/UMD
- ES6 Module

**（1）命名空间**

参考库：YUI

命名空间下面有个类型，这个类型是个对象。

库名.类别名.方法名

```js
var nameSpace = {}
nameSpace.type = nameSpace.type || {}
nameSpace.type.method = function() {}
```

**（2）COMMONJS**

诞生于node社区，只运行在服务端。

- 一个文件为一个模块，模块内变量外界访问不到
- 通过 module.exports 暴露模块接口
- 通过 require 引入模块
- 同步执行

```js
// demo
var module1 = require('./module.js');
exports = module.exports = module1;
```

**（3）AMD**
参考：requireJS

实现js文件的异步加载，避免网页失去响应；
管理模块之间的依赖性，便于代码的编写和维护。

- Async Module Definition
- 使用 define 定义模块
- 使用 require 加载模块
- RequireJS
- 依赖前置，提前执行

```js
// demo define module.js
define(['m1', 'm1'], function(m1, m2) {
  // output
  var add = function(x) {
    var z = m1();
    return x + z;
  };
  return {
    add: add
  }
})

// require main.js
require(['module'], function(m) {
  console.log(m.add(1));
})
```

**（4）CMD**

- Common Module Definition
- 一个文件为一个模块
- 使用define 来定义一个模块
- 使用 require 来加载一个模块
- SeaJS
- 尽可能懒执行

```js
define(function(require, exports, module) {
  var $ = require('jquery');
  var spinning = require('./spinning')

  exports.doSomething = function() {}

  // or
  module.exports = 
})
```

**（5）UMD**

- Universal Module Definition
- 通用解决方案
- 三个步骤
  - 判断是否支持AMD
  - 。。。。。。CommonJS
  - 如果都没有 使用全局方案

**（6）ES6 Module**

- EcmaScript Module
- 一个文件一个模块
- export / import
- import()

```js
import theDefault, { named1, named2 } from 'src/myLib';
import theDefault from 'src/myLib';

import {named1, named2 } from 'src/myLib';

import {named1 as myNamed1, named2 } from 'src/myLib';

import * as myLib from 'src/myLib';

import 'src/myLib';

export let myVar = '';
export const MY_CONST = '';

export function myFunc() {};
export function* myGeneratorFunc() {};
export class myClass() {};


export default 123;
export default function(x) {
  return x
};
export default x => x;
export default class {
  costructor(x, y) {
    this.x = x;
    this.y =y;
  }
}
```

webpack支持：
- AMD（RequireJS）
- ES Module（推荐）
- CommonJS

### CSS模块化
- CSS设计模式
  - OOCSS
  - SMACSS
  - Atomic CSS
  - MCSS
  - AMCSS
  - BEM
- CSS Modules

**（1）OOCSS**
设计和结构，容器和内容分离

**（2）SMACSS**
Base + Layout + Module + State + Theme = SMASS

**（3）Atomic CSS**
mt10, w100, h15

**（4）MCSS**
多层CSS

**（5）AMCSS**
属性CSS

**（6）BEM**
- Block: header, container, menu, checkbox, input
- Element: menu item, head title
- Modifier: disabled, checked

example:
.button--state-success

## 环境准备

- 命令行工具: Mac or win(git bash)
- Node + NPM: download
- Webpack: npm i -g webpack

## webpack 简介

### 概述
资源按需加载（代码分割），loaders
官网：https://webpack.js.org/
中文官网： https://doc.webpack-china.org
Version：V3.8.1
Github： https://github.com/webpack/webpack

### 版本迭代
github-release 版本更新日志

### 功能进化

- webpack V1
  - 编译、打包
  - HMR（模块热更新）
  - 代码分割
  - 文件处理
- V2
  - Tree Shaking：打包后的代码体积更小（引用的包没用）
  - ES module：es6 import export 支持
  - 动态 Import
  - 新的文档
- V3
  - Scope Hoisting（作用域提升）：打包后代码性能提升
  作用域提升（Scope Hositing ）是 Webpack 3 的标志性特征，老版本的 Webpack 需要将每个模块包裹在单独的函数闭包中以实现模块系统。而这些封装函数往往会使得浏览器中运行的 JavaScript 代码性能有所下降；而 Closure Compiler、RollupJS 这些构建工具则会将代码中所有的模块作用域连接到单一闭包中，从而保证了浏览器中的代码运行速度。
  - Magic Comments（配合动态import使用）：打包后的文件名

## 核心概念
- entry：代码入口、打包入口、单个或多个
- output：打包成的文件、一个或多个、自定义规则、配合CDN
- loaders：处理各种类型的文件、转化为模块
- plugins：参与打包整个过程、打包优化和压缩、配置编译时的变量、极其灵活；压缩、混淆，分割代码

```js
// entry
mosule.exports = {
  entry: './index.js'
  entry: ['index.js', 'vendor.js']
  entry: { index: 'index.js' } // 每个entry对应的key，
  entry: {
    index: ['index.js', 'vendor.js']
    vendor: 'vendor.js'
  }
}

// output
mosule.exports = {
  entry: './index.js'
  output: {
  	filename: 'index.min.js'
  }
}

// loader
// babel-loader ts-loader
// style-loader css-loader less-loader postcss-loader
// file-loader url-loader

// 常用Plugins
// 优化相关：CommonsChunkPlugin-提取不同代码之间相同的代码 UglifyjsWebpackPlugin-压缩混淆
// 功能相关：ExtractTextWebpackPlugin-提取CSS为单独文件 HtmlWebpackPlugin-生成HTML HotModuleReplacementPlugin-模块热更新 CopyWebpackPlugin-copy文件
// 名词：Chunk-代码块 Bundle-打包过以后的代码 Module-loader将文件处理成一个模块
function resolve (dir) {
  return path.join(__dirname, dir)
}
mosule.exports = {
  entry: {
  	index: './index.js',
  	vendor: './vendor.js'
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash:5].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
  	rules: [{
  		test: /\.css$/,
  		use: 'css-loader',
  	}, {
  		test: /\.js$/,
  		use: {
        loader: 'babel-loader',
        options: {
          presets: [['env', {
            targets: {
              browsers: ['>1%', 'last 2 versions']
            }
          }], 'react']
        }
      },
      exclude: '/node_modules/'
  	}]
  },
  plugins: [
  	new webpack.optimize.UglifyJsPlugin()
  ]
}

// webpack --config webapck.conf.dev.js
// webpack entry<entry> output
// babel-presets babel-plugin
// babel-loader
// npm install babel-loader@8.0.0-beta.0 @babel/core
// npm install –save-dev babel-loader babel-core
```

## 使用webpack
- webpack 命令
  webpack -h   webpack -v   webpack <entry> [<entry>] <output>
- webpack-cli
  npm i -g webpack-cli   webpack-cli init
- webpack 配置
  - webpack --config webpack.conf.dev.js(指定配置文件)
- 第三方脚手架
  - vue-cli
  - angular-cli
  - react-starter

### 打包JS

```bash
webpack entry <entry> output
webpack --config webpack.conf.js
```

### 编译ES6 / ES7

babel babel-presets babel-plugin
babel-loader
babeljs.io

```bash
npm install babel-loader@8.0.0-beta.0 @babel/core
# or
npm install –save-dev babel-loader babel-core
```

- babel presets
  - es2015
  - es2016
  - es2017
  - env(use this)
- babel-preset-react
- babel-preset-stage 0 - 3

```bash
npm i babel-preset-env --save-dev
```
ES6一些函数和方法需要借助下列插件编译：
example: Generator / Set / Map / Array.from / Array.prototype.includes

- babel polyfill（垫片）  
  全局垫片、为应用准备
  npm install babel-polyfill --save
  import 'babel-polyfill'   
- babel runtime transform
  局部垫片、为开发框架准备
  npm i babel-plugin-transform-runtime --save-dev
  npm i babel-runtime --save

.babelrc文件：
```json
{
  "presets": ["env"],
  "plugins": ["transform-runtime","transform-decorators-legacy"],
  "comments": false
}

```

### 编译Typescript

- JS 的超集
- typescriptlang.org / tslang.cn
- 微软开发的
- typescript-loader
  - 安装：npm i typescript ts-loader --save-dev
  npm i typescipt awesome-typescript-loader  --save-dev
  - 配置：tsconfig.json webpack.config.js

tsconfig:
配置选项：官网/docs/handbook/compiler-options.html
常用选项：compilerOptions  include  exclude
```json
// tsconfig
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "allowJs": true
  },
  "include": [
    "./src/*"
  ],
  "exclude": [
    "./node_modules"
  ]
}
```
```js
// webpack.config.js
mosule.exports = {
  entry: {
  	app: './app.ts'
  }
  output: {
  	filename: '[name].min.[hash:5].js'
  },
  module: {
  	rules: [{
  		test: /\.tsx?$/,
  		use: {
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
  	}]
  }
}

// app.ts
const NUM = 22
interface Cat {
  name: String,
  sex: String
}
function touchCat (cat: Cat) {
  console.log('miao', cat.name)
}
touchCat({
  name: 'tom'
})
```
### 提取公用代码
- 减少代码冗余
- 提高加载速度

CommonsChunkPlugin（适用于多entry的情况）
webpack.optimize.CommonsChunkPlugin

```js
// 配置
{
	plugins: [
	     new webpack.optimize.CommonsChunkPlugin(option)
	]
}
options.name or options.names
options.filename
options.minChunks
options.chunks
options.children
options.deepChildren
options.async

// 场景
// 单页应用
// 单页应用 + 第三方依赖
// 多页应用 + 第三方依赖 + webpack生成代码
```

### 代码分割和懒加载
改变代码编写方式

- webpack methods（wepack 内置方法）
  - require.ensure(下面为此方法参数)
    - []:dependencies
    - callback
    - errorCallback
    - chunkName
  - require.include
- ES2015 loader spec
  - System.import() -> import
  - import() -> Promise
  - import().then()

```js
import(
	/* webpackChunkName: 'async-chunk-name' */
	/* webpackMode: lazy */
	modulename
)
```
代码分割场景：

- 分离业务代码和第三方依赖
- 分离业务代码和业务公用代码和第三方依赖
- 分离首次加载和访问后加载的代码

代码案例：
- pageA, pageB 都依赖 subPageA, subPageB
- subPageA, subPageB 都依赖 moduleA
- pageA 依赖 lodash
- img1 img2 表示将第三方依赖提取出来
- img3 将subPageA, subPageB 提取出来，以及他们都依赖的 moduleA 分割了出来
- img4 使用动态 import 进行代码分割
- img5 指定上面分割出的代码的 chunkName
- img6 img7 img8 提取 subPageA, subPageB依赖的 moduleA

网页中只引用 pageA.bundle.js 最后发现， 被分割的代码根据给定的条件也是会被加载进来的。

### 处理CSS

- 引入
  - style-loader（将样式通过 style 标签引入）
    - style-loader/url
    - style-loader/useable
    - 配置options
    insertAt:：插入位置
    insertInto：插入DOM
    singleton：是否只使用一个 style 标签
    transform：转化，浏览器环境下，插入页面前
  - css-loader(JS 可以 import css 文件)
    - options
    alias：解析的别名
    importLoader：@import
    Minimize：是否压缩
    modules：启用css-modules
- CSS modules
  - :local
  - :global
  - compose
  - compose ... from path
- 配置 less / sass
  - npm install less-loader less  --save-dev
  - npm install sass-loader node-sass --save-dev
- 提取 CSS代码

```js
// 第一种loader 规则 将css 转化为页面style标签
// 第一种loader 规则 将css 转化为页面link 加载样式文件（不常用，每个import 的样式都会打包为一个样式文件，并 link 引入）
// style-loader/useable 控制是否插入 style
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
        options: {
          singleton: true,
          transform: './css.transform.js'
        }
      }, {
        loader: 'css-loader',
        options: {
          // minimize: true,
          modules: true,
          localIdentName: '[path][name]_[local]--[hash:base64:5]'
        }
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader/url'
      }, {
        loader: 'file-loader'
      }]
    }]
  }
}
```

```js
module.exports = {
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          // minimize: true,
          modules: true,
          localIdentName: '[path][name]_[local]--[hash:base64:5]'
        }
      }, {
        loader: 'less-loader'
      }]
    }]
  }
}
```

提取CSS：
- extract-loader
- ExtractTextWebpackPlugin
  - npm i extract-text-webpack-plugin --save

```js
// 配置
var  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: {
          loader: 'style-loader',
          options: {}
        },
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            modules: true,
            localIdentName: '[path][name]_[local]--[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              // require('autoprefixer')(),
              require('postcss-sprites')({
                spritePath: 'dist/assets/img/sprites',
                retina: true
              }),
              require('postcss-cssnext')()
            ]
          }
        }, {
          loader: 'less-loader'
        }]
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: '',
          outputPath: 'dist/',
          useRelativePath: true
        }
      }, {
        loader: 'url-loader', // img 转为base64 和上面的不要同时用
        options: {
          name: '[name]-[hash].[ext]',
          publicPath: '',
          outputPath: 'dist/',
          useRelativePath: true,
          limit: 10000
        }
      }, {
        loader: 'img-loader', 
        options: {
          pngquant: {
            quality: 80
          }
        }
      }]
    }, {
      test: /\.(eot|woff2?|ttf|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]-[hash].[ext]',
          publicPath: '',
          outputPath: 'dist/',
          useRelativePath: true,
          limit: 5000
        }
      }
    }]
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'src/libs/jquery')
    }
  }
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false // 默认只打包初始化的，不包含异步的， 设置为true 则依赖全部打包
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/*.js')
      ])
    }),
    new Webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['app'],
      minify: {
        collapseWhiteSpace: true
      }

    }),
    new Webpack.optimize.uglifyJS()
	]
}
```

### PostCss

处理 CSS 的工具：安装：
- postcss
- postcss-loader
- Autoprefixer：自动加浏览器前缀
- cssnano：优化压缩
- postcss-cssnext：使用未来 CSS 语法

所有插件共用：

```js
// package.json
{
  "broswerslist": {
    ">= 1%",
    "last 2 version"
  }
}
```

### Tree Shaking

**JS Tree Shaking**

使用场景：
- 常规优化
- 引入第三方库的某一个功能

插件：Webpack.optimize.uglifyJS

```js
// 自己项目文件
new Webpack.optimize.uglifyJS()

// 第三方库
npm i lodash-es --save
npm i babel-plugin-lodash --save-dev
```

**CSS Tree Shaking**
Purify CSS(https://github.com/purifycss/purifycss)
- purifycss-webpack
- glob-all

### 文件处理
**图片处理**
- file-loader
- url-loader
- img-loader
- postcss-sprites

**字体文件**
- file-loader
- url-loader

### 第三方JS库
- webpack.providePlugin
- imports-loader
- window

### HTML in Webpack
html-webpack-plugin：自动生成 HTML，插入打包后的 JS CSS

### HTML 引入图片
html-loader或者`<img src="${require('./xxxx.png')}">`

### 配合优化
html-webpack-inline-chunk-plugin：配合 html-webpack-plugin 使用，将插入html的打包文件，外链模式改为内联。例如：`script-src 变为 <script>xxxxx</script>`

## 搭建开发环境
clean-webpack-plugin
webpack watch mode: webpack -watch
webpack-dev-server
express + webpack-dev-middleware
- 模块热更新
  - devServer.hot
  - webpack.HotModuleReplacementPlugin
  - webpack.NameModulesPlugin
- 开启调试 SourceMap
  - devtool
  - webpack.SourceMapDevToolPlugin
  - webpack.EvalSourceMapDevToolPlugin
- EsLint 检查代码
  - eslint
  - eslint-config-standard
  - eslint-loader
  - eslint-plugin-html
  - eslint-friendly-formatter
- 开发环境&生产环境

生产环境：提取公用代码、压缩混淆、文件压缩 或 BASE64 编码、去除无用代码；

共同点：同样的入口，同样的代码处理，同样的解析配置
how区别：webpack-merge
webpack.dev.conf.js webpack.prod.conf.js webpack.common.conf.js

## 打包结果分析
- Offical Analyse Tool
- webpack-bundle-analyzer
  - 插件：BundleAnalyzerPlugin

## 优化打包速度
- 文件多？
- 依赖多？
- 页面多？

方法：
- 分开 vendor 和 app
  - Dllplugin
  - DllReferencePlugin
- UglifyJsPlugin(并行处理)
  - parallel
  - cache
- HappyPack
  - HappyPack.ThreadPool(loader 并行处理)
- babel-loader
  - options.cacheDirectory
  - include
  - exclude
- 其他
  - 减少 resolve
  - Devtool：去除 sourcemap
  - cache-loader
  - 升级 node
  - 升级 webpack

## 长缓存优化
what why how
- 场景：
  - 改变 app 代码，vendor 变化
- 解决
  - 提取 vendor
  - hash -> chunkhash(output 中的 filename)
  - 提取 webpack runtime
- 场景：
  - 引入新模块，模块顺序变化，vendor hash 变化
- 解决
  - NamedChunksPlugin
  - NamedModulesPlugin
- 场景
  - 动态引入模块时，vendor hash 变化
- 解决
  - 最新版 webpack 已解决
  - 老版本：定义动态模块的 chunkname

## 多页面应用
- 场景
  - 多入口 entry
  - 多页面 html
  - 每个页面不同的 chunk
  - 每个页面不同的参数
- 使用
  - 多配置（webpack 3.1.0 支持）parallel-webpack，配置独立灵活
  缺点：不能多页面之间共享代码
  - or 单配置

parallel-webpack:
- parallel-webpack --watch
- parallel-webpack --config

单配置：
- 优点
  - 可以共享各个 entry 之间的公用代码
- 缺点
  - 打包速度比较慢
  - 输出内容比较复杂


## vue 和 webpack
```bash
vue list
vue init <template name> <project name>
# 使用自己定制的模板
vue init <git repo> <project name>

# 打包项目，并分析
npm run build --report
```

## react 和 webpack
- create-react-app
- react-scripts

```bash
npx create-react-app my-project(npm 5.2+)
create-react-app my-project(npm 5.2-)

npm start
npm test
npm run build 
npm run eject
```
- 支持 ES6 和 JSX
- 支持 动态 import
- 支持 Fetch (polyfill)
- 支持 proxy
- 支持 postcss
- 支持 eslint
- 不支持 React Hot-reloading
- 弱支持 CSS 预处理器

```bash
# 解决预处理和热更新
npm i less less-loader react-hot-loader --save
```

## 面试
- 概念
  - webpack gulp 区别

## webpack 升级相关
1、先把代码备份(你懂得)；
2、安装npm-check；
3、使用npm-check -u命令将依赖全部(尽量全部，你懂得)升级；
4、使用最新版vue-cli创建一个demo项目；
5、把demo项目的config和build两个目录，覆盖到你的项目中的这两个目录；
6、运行npm run dev命令，查看错误，根据错误修改源码；
7、祝好运。

补充一下：
执行npm run build时可能会提示缺少两个包，你执行npm install XXXX安装上就好了。