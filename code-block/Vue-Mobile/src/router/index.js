import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const myRouter = new Router({
  mode: 'hash',
  base: __dirname,
  routes
})

myRouter.beforeEach((to, from, next) => {
  let token = Vue.cookie.get('token')
  if (!token || !/\S/.test(token)) {
    clearLoginInfo()
    next({
      name: 'login'
    })
  }
  if (to.path !== from.path) {
    window.document.title = to.meta.title
  }
  next()
})

// myRouter.afterEach(route => {   commit('UPDATE_LOADING', false) })

export default myRouter