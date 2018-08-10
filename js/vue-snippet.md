vue 常用的代码段

## 模板
```vue
<template>
  <div> </div>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: true,
        required: true
      }
    },
    computed: {
      num2() {
        return num + 1
      }
    },
    mounted() {},
    updated() {},
    watch: {
      num(val, oldVal) {
        this.init()
      }
    }
    data() {
      return {
        num: 0
      }
    },
    created() {},
    methods() {
      init() {}
    },
    destroyed() {
      // clearInterval(timer)
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function(el, binding) {
          // el.focus()
        }
      }
    },
    filters: {
      dateFilter(val) {}
    },
    components: {
      Header
    }
  }
</script>
```

## 插件定义方法
```js
import GHead from './ghead.vue'
import ajax from './ajax.js'

function dateFilter(val) {
  return val + 1
}
export default {
  install(Vue) {
    Vue.component('g-head', GHead)
    Vue.filter('dateFilter', dateFilter)
    Vue.directive('focus', {
      // 被绑定元素插入父节点时调用
      inserted(el, binding, vnode) {
        // 指令所绑定的元素，可以用来直接操作 DOM 。
        console.log(el)
        // 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2
        console.log(binding.value)
      },
      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
      update() {},
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated() {}
    })
    Vue.prototype.$property = ajax
  }
}

```

## 路由
```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import User from './user'
const routes = [{
  path: '/',
  // 重定向
  redirect: '/user'
  // redirect: { name: 'foo' } 别名用法
}, {
  // 写法示范  /user/:id
  // 获取参数  $route.params.id
  // 查询参数为 $route.query
  path: '/user',
  component: User,
  // 命名路由
  name: 'user',
  meta: {},
  beforeEnter(to, from, next) {},
  children: [{
    path: '',
    component: Content
  }]
}]
const router = new VueRouter({
  // 配置了 router 的 Vue 根实例。
  app,
  base,
  // 路由使用的模式。
  mode,
  // 当前路由对应的路由信息对象。
  currentRoute,
  routes,
})
```
### 守卫

（1）全局守卫
```js
router.beforeEach((to, from, next) => {
  // ...
  // next()
})
router.afterEach((to, from) => {
  // ...
})
```

守卫方法参数解析：

- to: Route: 即将要进入的目标 路由对象
- from: Route: 当前导航正要离开的路由
- next: Function: 一定要调用该方法来 resolve 这个钩子。 执行效果依赖 next 方法的调用参数。
- next(): 进行管道中的下一个钩子。 如果全部钩子执行完了， 则导航的状态就是 confirmed（ 确认的）。
- next(false): 中断当前的导航。 如果浏览器的 URL 改变了（ 可能是用户手动或者浏览器后退按钮）， 那么 URL 地址会重置到 from 路由对应的地址。
- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。 当前的导航被中断， 然后进行一个新的导航。
- next(error): (2.4 .0 + ) 如果传入 next 的参数是一个 Error 实例， 则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

（2）组件内的守卫
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 路由跳转
```js
<router-link :to="..."></router-link>
// 有时候我们要让激活 class 应用在外层元素，而不是 <a> 标签本身，那么可以用 <router-link> 渲染外层元素，包裹着内层的原生 <a> 标签：
<router-link tag="li" to="/foo">
  <a>/foo</a>
</router-link>
---
// router.push()

// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

---

// router.replace()

// 代替上一个路由
<router-link :to="..." replace></router-link>
router.replace(...)

---

// router.go()

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```
你也许注意到 router.push、 router.replace 和 router.go 跟 window.history.pushState、 window.history.replaceState 和 window.history.go好像， 实际上它们确实是效仿 window.history API 的。

### 命名视图
```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

routes: [{
  path: '/',
  components: {
    default: Foo,
    a: Bar,
    b: Baz
  }
}]

// 因为它也是个组件，所以可以配合 <transition> 和 <keep-alive> 使用。如果两个结合一起用，要确保在内层使用 <keep-alive>：
<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```

### 过渡动效
```vue
<transition>
  <router-view></router-view>
</transition>
```

### $route

属性：
- $route.path
- $route.params
- $route.query
- $route.hash：当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
- $route.fullPath：完成解析后的 URL，包含查询参数和 hash 的完整路径。
- $route.matched：一个数组，包含当前路由的所有嵌套路径片段的 路由记录 。路由记录就是 routes 配置数组中的对象副本（还有在 children 数组）。
```js
const router = new VueRouter({
  routes: [
    // 下面的对象就是 route record
    { path: '/foo', component: Foo,
      children: [
        // 这也是个 route record
        { path: 'bar', component: Bar }
      ]
    }
  ]
})
当 URL 为 /foo/bar，$route.matched 将会是一个包含从上到下的所有对象（副本）。
```
- $route.name

## 动画
vue transiton
```js
/*这个定义动画情况，以及存在时的样式，这个样式会覆盖class里的样式*/
    .mytran-transition {
        transition: all 0.3s ease;
        background-color: greenyellow;
    }
 
    /* .mytran-enter 定义进入的开始状态 */
    /* .mytran-leave 定义离开的结束状态 */
    .mytran-enter, .mytran-leave {
        height: 0;
        width: 0;
    }

Vue.transition('mytran', {
    beforeEnter: function (el) {    //进入之前
        console.log("进入动画开始时间:" + new Date().getTime());
    },
    enter: function (el) {
        el.textContent = new Date();
    },
    afterEnter: function (el) {
        console.log("进入结束时间:" + new Date().getTime());
    },
    beforeLeave: function (el) {
        console.log("离开动画开始时间:" + new Date().getTime());
    },
    leave: function (el) {
        $(el).text("离开中..." + new Date());
    },
    afterLeave: function (el) {
        console.log("离开结束时间:" + new Date().getTime());
    }
})
```
## 组件

```js
var myCom = Vue.extend({
  template: '<div>这是我的组件</div>'
})

<template id="myCom">
  <div>这是template标签构建的组件</div>
</template>

<script type="text/x-template" id="myCom1">
  <div>这是script标签构建的组件</div>
</script>

Vue.component('my-com',myCom)

Vue.component('my-com',{
  'template':'<div>这是我的组件</div>'
})

Vue.component('my-com',{
    template: '#myCom'
})

var app = new Vue({
  el: '#app',
  components: {
    'my-com': myCom
  }
})

var app = new Vue({
  el: '#app',
  components: {
    'my-com': {
        template: '<div>这是我的组件</div>'
    }
  }
})

var app = new Vue({
  el: '#app',
  components: {
    'my-com': {
      template: '#myCom'
    }
  }
})

// 异步组件
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

### 组件传值
bus方式的组件间传值其实就是建立一个公共的js文件，专门用来传递消息

**1. 建立公共文件，并引入**

新建msgBus.js文件。只需两句代码。
```JS
import Vue from 'vue'
export default new Vue;
```
**2. 然后在需要传递消息的两个组件引入**
```JS
import MsgBus from '@/components/utils/msgBus.js';
```

**3. 发送消息**

触发组件的事件：

MsgBus.$emit('msg', _this.examineNum);

**4.接受消息**

接受组件的事件：

写在钩子函数内：例如：mounted   created都可以
```JS
MsgBus.$on('msg', (e) => {
  this.examineNum = e;
})
```

### 自定义组件demo

```js
// toast.js
var Toast = {};
Toast.install = function (Vue, options) {
  let opt = {
      defaultType:'bottom',   // 默认显示位置
      duration:'2500'         // 持续时间
  }
  for(let property in options){
      opt[property] = options[property];  // 使用 options 的配置
  }
  Vue.prototype.$toast = (tips,type) => {
      if(type){
          opt.defaultType = type;         // 如果有传type，位置则设为该type
      }
      if(document.getElementsByClassName('vue-toast').length){
          // 如果toast还在，则不再执行
          return;
      }
      let toastTpl = Vue.extend({
          template: '<div class="vue-toast toast-'+opt.defaultType+'">' + tips + '</div>'
      });
      let tpl = new toastTpl().$mount().$el;
      document.body.appendChild(tpl);
      setTimeout(function () {
          document.body.removeChild(tpl);
      }, opt.duration)
  }
  ['bottom', 'center', 'top'].forEach(type => {
      Vue.prototype.$toast[type] = (tips) => {
          return Vue.prototype.$toast(tips,type)
      }
  })
}
module.exports = Toast;
```