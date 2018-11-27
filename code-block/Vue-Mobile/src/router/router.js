const route = [{
  path: '/index',
  component: () =>
    import('views/index'),
  name: 'Index',
  meta: {
    title: '微型植物工厂'
  }
}, {
  path: '/main',
  component: () =>
    import('views/main'),
  name: 'Main',
  meta: {
    title: '主页'
  },
  children: [{
    path: '/view-status',
    component: () =>
      import('views/view-status'),
    name: 'ViewStatus',
    meta: {
      title: '状态查看'
    }
  }, {
    path: '/param-setting',
    component: () =>
      import('views/param-setting'),
    name: 'ParamSetting',
    meta: {
      title: '参数设置'
    }
  }, {
    path: '/hand-control',
    component: () =>
      import('views/hand-control'),
    name: 'HandControl',
    meta: {
      title: '手动控制'
    }
  }, {
    path: '/host-service',
    component: () =>
      import('views/host-service'),
    name: 'HostService',
    meta: {
      title: '托管服务'
    }
  }]
}, {
  path: '/host-expert',
  component: () =>
    import('views/host-expert'),
  name: 'HostExpert',
  meta: {
    title: '申请专家托管'
  }
}, {
  path: '/pay',
  component: () =>
    import('views/pay'),
  name: 'Pay',
  meta: {
    title: '订单支付'
  }
}, {
  path: '/pay-success',
  component: () =>
    import('views/pay-success'),
  name: 'PaySuccess',
  meta: {
    title: '支付成功'
  }
}, {
  path: '/login',
  name: 'Login',
  component: () =>
    import('views/login'),
  meta: {
    title: '登录'
  }
}, {
  path: '/register',
  name: 'Register',
  component: () =>
    import('views/register'),
  meta: {
    title: '注册'
  }
}, {
  path: '/audit',
  name: 'Audit',
  component: () =>
    import('views/audit'),
  meta: {
    title: '等待审核'
  }
}]

export default route
