## 小程序常用API 基于Wepy
```js
// 一些属性方法
this.$wxapp
this.$pages
this.$invoke('./ComB', 'func1', 'p1', 'p2');
this.$broadcast('broadcast-event', 'p1', 'p2');
this.$emit('emit-event', 'p1', 'p2');
this.$apply();
this.$nextTick().then(function() {
  console.log('UI updated');
});

// 路由
this.$redirect('./page2', {
  a: 1,
  b: 2
});
this.$redirect({
  url: './pages?a=1&b=2'
});
this.$navigate(url: String | Object, [params: Object])
this.$switch(url: String | Object)
wepy.navigateBack({
  delta: 2 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
})
wepy.reLaunch({ // 关闭所有页面，打开到应用内的某个页面。
  url: 'test?id=1'
})

// 登录
wx.login().then(res => {
  console.log(res)
  if (res.code) {
    wepy.getUserInfo().then(res => {
      console.log(res)
      wepy.request('').then(res => {
        console.log(res)
      })
    })
  } else {
    console.log('登录失败！' + res.errMsg)
  }
})

// 授权
wepy.authorize({
  scope: 'scope.record'
}).then(res => {
  console.log(res)
})

// 打开设置
wepy.openSetting().then(res => {
  console.log(res)
})

// 转发
wepy.showShareMenu({
  withShareTicket: true
})
wepy.hideShareMenu()

onShareAppMessage(res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: 'eeeeee',
    // imageUrl: ''
    path: '/pages/draw/draw',
    success(res) {
      console.log(res)
    }
  }
}

// 请求
const requestTask = wepy.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  method: 'GET',
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  }
}).then(res => {
  console.log(res.data)
})
requestTask.abort() // 取消请求任务

// 本地存储
wx.setStorage({
  key: "key",
  data: "value"
})
wx.setStorageSync('key', 'value')

wx.getStorage({
  key: 'key',
  success: function(res) {
    console.log(res.data)
  }
})

wx.getStorageInfo({
  success: function(res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})

wx.removeStorage({
  key: 'key',
  success: function(res) {
    console.log(res.data)
  }
})

try {
  wx.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}

wx.clearStorage()

// 界面交互 弹窗等
wx.showToast({
  title: '成功',
  icon: 'success', // loading none
  image: '',
  mask: false, // 默认为false
  duration: 2000
})
wx.hideToast()

wx.showLoading({
  title: '加载中',
  mask: false
})
wx.hideLoading()

wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  showCancel: true, // 是否显示取消按钮
  cancelText: '取消',
  cancelColor: '#444',
  confirmText: '确认',
  confirmColor: '#3CC51F',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})

wx.showActionSheet({
  itemList: ['A', 'B', 'C'], // 按钮的文字数组
  itemColor: '#444', // 按钮的文字颜色
  success: function(res) {
    console.log(res.tapIndex) // 用户点击的按钮，从上到下的顺序，从0开始
  },
  fail: function(res) {
    console.log(res.errMsg)
  }
})

// 在当前页面显示导航条加载动画。
wx.showNavigationBarLoading()
  // 隐藏
wx.hideNavigationBarLoading()

wepy.setTabBarBadge({
  index: 0, // tabBar的哪一项，从左边算起
  text: '1' // 显示的文本，超过 3 个字符则显示成“…”
})
wx.removeTabBarBadge({
  index: 0 // tabBar的哪一项，从左边算起
})
wx.showTabBarRedDot({
  index: 0
})
wx.hideTabBarRedDot({
  index: 0
})

// 点击 tab 时触发
onTabItemTap(item) {
  console.log(item.index)
  console.log(item.pagePath)
  console.log(item.text)
}

// 动画使用方法
// <view animation="{{animationData}}" style="background:red;height:100rpx;width:100rpx"></view>
{
  data: {
    animationData: {}
  },
  onShow: function() {
    var animation = wx.createAnimation({ // 创建动画
      duration: 1000,
      timingFunction: 'ease',
      // delay: '' 动画延迟时间
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function() {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  rotateAndScale: function() {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function() {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function() {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  }
}

// 回到顶部
wepy.pageScrollTo({
  scrollTop: 0,
  duration: 300
})

// 自动下拉刷新
wepy.startPullDownRefresh()
  // 停止
wepy.stopPullDownRefresh()

// 页面相关事件方法
onPullDownRefresh: function() {
  // Do something when pull down.
}
onReachBottom: function() {
  // Do something when page reach bottom.
}
onShareAppMessage: function() {
  // return custom share data when user share.
}
onPageScroll: function() {
  // Do something when page scroll
}

// 登陆
wepy.login().then(res => {
  console.log('loginInfo', res)
  if (res.code) {
    wx.request({
      url: 'https://test.com/onLogin',
      data: {
        code: res.code
      }
    })
  } else {
    console.log('登录失败！' + res.errMsg)
  }
})

// 获取用户信息
wepy.getUserInfo().then(res => {
  console.log('userInfo', res)
  this.globalData.userInfo = res.userInfo
})

// 微信支付
wepy.requestPayment({
  'timeStamp': '',
  'nonceStr': '', // 随机字符串，长度为32个字符以下。
  'package': '', // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
  'signType': 'MD5',
  'paySign': '', // 签名
  'success':function(res){
  },
  'fail':function(res){
  }
})
```