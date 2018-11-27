// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import utils from '@/utils'
import vantUI from './components/vantui'
import customUI from './components'

import App from './App'

import '@/utils/rem.js'
import '@/assets/less/base.less'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(vantUI)
Vue.use(customUI)
Vue.use(utils)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
