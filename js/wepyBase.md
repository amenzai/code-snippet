# wepy使用指南
## 安装
```bash
# 安装工具
npm install wepy-cli -g

# 查看项目模板
wepy list

# 初始化项目
wepy init standard myproject

cd myproject
npm  install

# 实时监控修改并编译
wepy build --watch
```

## 两个文件示例
app.wpy
```vue
<style lang='less'>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
  config = {
    // 配置需要展示的页面路径
    pages: [
      'pages/index'
    ],
    window: {
      // backgroundColor: '#fff', 窗口背景色
      // enablePullDownRefresh 是否开启下拉刷新
      // onReachBottomDistance 页面上拉触底事件触发时距页面底部距离，单位为px
      backgroundTextStyle: 'light', // 下拉 loading 的样式，仅支持 dark/light
      navigationBarBackgroundColor: '#fff', // 导航栏背景色
      navigationBarTitleText: 'WeChat', // 文字内容
      navigationBarTextStyle: 'black' // 导航栏标题色
    },
    tabBar: {
      color: '#888', // 文字
      selectedColor: '#89bdf7', // 选中文字
      backgroundColor: '#fff',
      borderStyle: 'white', // 上边框颜色 white black
      position: 'bottom', // 'top',   default: 'bottom' 
      list: [{
          pagePath: 'pages/index/index', // 点击跳转的页面路径
          text: '首页',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_active.png'
      }]
    },
    debug: true,
    networkTimeout: {
      // 相关请求超时时间
      request: 10000,
      connectSocket: 10000,
      uploadFile: 10000,
      downloadFile: 10000
    }
  }

  globalData = {
    userInfo: null
  }

  constructor () {
    super()
    this.use('promisify') // 开启promise
    this.use('requestfix')
    this.intercept('request', {
      // 发出请求时的回调函数
      config (p) {
          // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
          p.timestamp = +new Date();
          console.log('config request: ', p);
          // 必须返回OBJECT参数对象，否则无法发送请求到服务端
          return p;
      },
      // 请求成功后的回调函数
      success (p) {
          // 可以在这里对收到的响应数据对象进行加工处理
          console.log('request success: ', p);
          // 必须返回响应数据对象，否则后续无法对响应数据进行处理
          return p;
      },
      // 请求失败后的回调函数
      fail (p) {
          console.log('request fail: ', p);
          // 必须返回响应数据对象，否则后续无法对响应数据进行处理
          return p;
      },
      // 请求完成时的回调函数(请求成功或失败都会被执行)
      complete (p) {
          console.log('request complete: ', p);
      }
    })
  }
  onLaunch() {
    this.testAsync()
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  async testAsync () {
    const data = await this.sleep(3)
    console.log(data)
  }

  getUserInfo(cb) {
    const that = this
    if (this.globalData.userInfo) {
      return this.globalData.userInfo
    }
    wepy.getUserInfo({
      success (res) {
        that.globalData.userInfo = res.userInfo
        cb && cb(res.userInfo)
      }
    })
  }
}
</script>
```

index.wpy
```vue
<!-- 存在src属性且有效时，会忽略内联代码。 -->
<style lang="less">
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }
</style>
<template>
  <!-- 循环渲染用 repeat标签 -->
  <!-- <repeat for="{{list}}" key="index" index="index" item="item">
      <child :item="item">这个是引入的组件 传递了item数据</child>
  </repeat> -->

  <!-- <view @tap="tapName({{index}}, 'wepy', 'otherparams')"> Click me! </view> -->
  <view class="container">
    <view class="userinfo" @tap="handleViewTap">
      <image class="userinfo-avatar" src="{{ userInfo.avatarUrl }}" background-size="cover"/>
      <view class="userinfo-nickname">{{ userInfo.nickName }}</view>
    </view>
    
    <panel>
      <view class="title" slot="title">测试数据绑定</view>

      <text class="info">{{normalTitle}}</text>
      <text class="info">{{setTimeoutTitle}}</text>
      <text class="info">{{mixin}}</text>
      <text class="info">{{mynum}}</text>
      <text class="info">{{now}}</text>
      <button @tap="plus('a')" size="mini">  +  </button>
    </panel>

    <panel>
      <view class="title" slot="title">其它测试</view>
      <button @tap="toast" size="mini">第三方组件</button>
      <button @tap="communicate" size="mini">组件通信</button>
      <button @tap="tap" size="mini">混合TAP事件</button>
    </panel>

    <panel>
      <view class="title" slot="title">测试并发网络请求</view>
      <view>返回结果: <text>{{netrst}}</text></view>
      <button @tap="request" size="mini"> 点我发起10个请求 </button>
    </panel>

    <panel>
      <view class="title" slot="title">测试组件</view>

      <text class="testcounter">计数组件1: </text>
      <view class="counterview">
        <counter1 @index-emit.user="counterEmit" />
      </view>

      <text class="testcounter">计数组件2: </text>

      <view class="counterview">
        <counter2 :num.sync="mynum"></counter2>
      </view>
    </panel>

    <panel>
      <view class="title" slot="title">测试组件Repeat</view>
      <repeat for="" index="index" item="item" key="key">
        <group :grouplist="item" :indexa="index"></group>
      </repeat>
    </panel>

    <panel>
      <view class="title" slot="title">测试列表</view>
      <list></list>
    </panel>

    <toast />
  </view>
</template>

<script>
  // 异步函数中更新数据的时，必须手动调用$apply方法，才会触发脏数据检查流程的运行
  // wepy.request('xxxx').then((d) => console.log(d));
  // this.$parent 获取APP实例中的方法 数据
  
  import wepy from 'wepy'
  import Panel from '@/components/panel' // alias example
  import Counter from 'counter' // alias example
  import List from '../components/list' // aliasFields example
  import moduleA from 'module-a' // aliasFields ignore module example
  import Group from '../components/group'
  import Toast from 'wepy-com-toast'
  import testMixin from '../mixins/test'

  console.log('moduleA ignored: ', moduleA) // => moduleA ignored: {}


  export default class Index extends wepy.page {
    // 页面配置
    config = {
      navigationBarTitleText: 'test'
    }
    // 组件调用
    // 组件传值： 静态传值、动态传值
    // 静态（只能传递String字符串类型）： <child title="mytitle"></child>  props = {title: String };
    // 动态：<child :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></child>
    // child.wpy
    // props = {
    //     // 静态传值
    //     title: String,

    //     // 父向子单向动态传值
    //     syncTitle: {
    //         type: String,
    //         default: 'null'
    //     },

    //     twoWayTitle: {
    //         type: Number,
    //         default: 'nothing',
    //         twoWay: true
    //     }
    // };
    // this.$parent.parentTitle = 'p-title-changed'; 拿到父组件数据，进行更改
    // this.$parent.$apply(); 同步
    components = {
      panel: Panel,
      counter1: Counter, // 为两个相同组件的不同实例分配不同的组件ID，从而避免数据同步变化的问题
      counter2: Counter,
      list: List,
      group: Group,
      toast: Toast
    }

    // 公用属性、方法、事件对象
    // methods响应事件 先响应组件本身响应事件，然后再响应混合对象中响应事件
    mixins = [testMixin]

    // 内部数据
    data = {
      mynum: 20,
      userInfo: {
        nickName: '加载中...'
      },
      normalTitle: '原始标题',
      setTimeoutTitle: '标题三秒后会被修改',
      count: 0,
      netrst: '',
      groupList: [
        {
          id: 1,
          name: '点击改变',
          list: [
            {
              childid: '1.1',
              childname: '子项，点我改变'
            }, {
              childid: '1.2',
              childname: '子项，点我改变'
            }, {
              childid: '1.3',
              childname: '子项，点我改变'
            }
          ]
        },
        {
          id: 2,
          name: '点击改变',
          list: [
            {
              childid: '2.1',
              childname: '子项，点我改变'
            }, {
              childid: '2.2',
              childname: '子项，点我改变'
            }, {
              childid: '2.3',
              childname: '子项，点我改变'
            }
          ]
        },
        {
          id: 3,
          name: '点击改变',
          list: [
            {
              childid: '3.1',
              childname: '子项，点我改变'
            }
          ]
        }
      ]
    }

    // 计算属性 和vue一样
    computed = {
      now () {
        return +new Date()
      }
    }

    watch = {
      // num (newValue, oldValue) {
      //     console.log(`num value: ${oldValue} -> ${newValue}`)
      // }
    }

    // 页面绑定事件对应的处理函数
    methods = {
      plus () {
        this.mynum++
      },
      toast () {
        let promise = this.$invoke('toast', 'show', {
          title: '自定义标题',
          img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
        })

        promise.then((d) => {
          console.log('toast done')
        })
      },
      tap () {
        console.log('do noting from ' + this.$name)
      },
      communicate () {
        console.log(this.$name + ' tap')

        this.$invoke('counter2', 'minus', 45, 6)
        this.$invoke('counter1', 'plus', 45, 6)

        this.$broadcast('index-broadcast', 1, 3, 4)
      },
      request () {
        let self = this
        let i = 10
        let map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==']
        while (i--) {
          wepy.request({
            url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
            success: function (d) {
              self.netrst += d.data + '.'
              self.$apply()
            }
          })
        }
      },
      counterEmit (...args) {
        let $event = args[args.length - 1]
        console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
      }
    }

    // WePY组件事件处理函数对象，存放响应组件之间通过$broadcast、$emit、$invoke所传递的事件的函数
    // this.$broadcast('some-event', arg) 父亲向所有孩子
    // this.$emit('some-event', arg) 孩子向所有父亲
    // this.$invoke('Acomponent path', 'someMethod' ,arg) A组件调用B组件
    events = {
      'index-emit': (...args) => {
        let $event = args[args.length - 1]
        console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
      }
    }

    // 生命周期函数
    onLoad() {
      let self = this
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo
        }
        self.normalTitle = '标题已被修改'

        self.setTimeoutTitle = '标题三秒后会被修改'
        setTimeout(() => {
          self.setTimeoutTitle = '到三秒了'
          self.$apply()
        }, 3000)

        self.$apply()
      })
    }
  }
</script>
```
