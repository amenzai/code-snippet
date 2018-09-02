1. 应用开发使用 babel-polyfill，框架开发使用 transform-runtime
2. CommonsChunkPlugin（适用于多entry的情况）
3. webpack.config.js 演示 ES6 编译打包
4. webpack.config.test1.js 演示提取公共代码
5. webpack.config.test2.js 演示代码分割和懒加载（动态 import）