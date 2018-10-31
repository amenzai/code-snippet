import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import ElementUI from '@/element-ui'          // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'

import utils from './utils'
import Component from './components'
// import cloneDeep from 'lodash/cloneDeep'
// import config from '@src/utils/config'

Vue.use(VueCookie)
Vue.use(utils)
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false
// Vue.config.devtools = true

// 保存整站vuex本地储存初始状态
// config['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
