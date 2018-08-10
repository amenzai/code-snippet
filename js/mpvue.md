# mpvue笔记

## 安装

```bash
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

## 实例生命周期
小程序 onReady 后，才触发 vue mounted 生命周期。

不建议使用小程序的生命周期钩子。

用法：

```js
new Vue({
  data: {
    a: 1
  },
  created () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a, '小程序触发的 onshow')
  }
})
// => "a is: 1"
```
微信小程序的页面的 query 参数是通过 onLoad 获取的，mpvue 对此进行了优化，直接通过 this.$root.$mp.query 获取相应的参数数据，其调用需要在 onLoad 生命周期触发之后使用，比如 onShow 等。

如何获取小程序在 app onLaunch/onShow 时候传递的 options？
在所有的组件内可以通过 this.$root.$mp.appOptions 进行获取。

## 不能用的东西

v-html

目前可以使用的运算表达式： + - * % ?: ! == === > < [] .，剩下的还待完善。

```html
<!-- 这种就不支持，建议写 computed -->
<p>{{ message.split('').reverse().join('') }}</p>

<!-- 但写在 @event 里面的表达式是都支持的，因为这部分的计算放在了 vdom 里面 -->
<ul>
    <li v-for="item in list">
        <div @click="clickHandle(item, index, $event)">{{ item.value }}</p>
    </li>
</ul>
```

不支持过滤器

不支持在 template 内使用 methods 中的函数。

不支持在组件上使用 Class 与 Style 绑定

合理使用双向绑定 mpvue 建议使用 v-model.lazy 绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题。