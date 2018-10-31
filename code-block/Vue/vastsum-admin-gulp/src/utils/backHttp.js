import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {
  clearLoginInfo,
  removeEmptyProp
} from '@/utils/utils'
import config from './config'
import {
  Message,
  Notification
} from 'element-ui'

// const http = axios.create({
//   timeout: 1000 * 30,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   }
// })

const isDev = process.env.NODE_ENV === 'development'
// const contentType = 'application/x-www-form-urlencoded' //  || 'application/json'
const contentType = 'json'

axios.defaults.withCredentials = true
axios.defaults.timeout = 1000 * 3
axios.defaults.baseURL = isDev && process.env.OPEN_PROXY ? '/proxyApi' : config.productHost // 请求地址处理
axios.defaults.headers = {
  'Content-Type': contentType === 'json' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [
  function (data) {
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
  }
]
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, {
    arrayFormat: 'brackets'
  })
}

/**
 * 请求拦截
 */
axios.interceptors.request.use(function (config) {
  // commit('UPDATE_LOADING', true)
  // config.headers['Authorization'] = Vue.cookie.get('token') // 请求头带上token
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    if (response.data.code === 401) { // 401, token失效
      console.log('请求未授权')
      // Notification({
      //   title: '登录超时',
      //   message: '登录超时',
      //   type: 'error'
      // })
      clearLoginInfo()
      router.push({
        name: 'login'
      })
    } else if (response.data.code === 403) { // 403，页面无权访问
      Notification({
        title: '没有权限',
        message: '该页面无权访问！',
        type: 'error'
      })
    }
  }
  // 不显示loading
  // commit('UPDATE_LOADING', false)
  return response
}, function (error) {
  // 对响应错误做点什么
  // commit('UPDATE_LOADING', false)
  const title = '服务正在升级，请稍后再试！'
  Notification({
    title: title,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

export default {
  get: function (path, params, type) {
    let url
    if (!params) {
      url = path
    } else {
      if (!type) {
        params = removeEmptyProp(params) //  type为true不过滤空字符串的发送
      }
      url = path + '?' + qs.stringify(params)
    }
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (res.data.code === 500) {
          Message({
            message: res.data.msg,
            type: 'error'
          })
          reject(res.data)
        }
      })
    })
  },
  post: function (path, params, type) {
    if (!params) {
      params = {}
    }
    if (!type) {
      params = removeEmptyProp(params) //  type为true不过滤空字符串的发送
    }
    return new Promise((resolve, reject) => {
      axios.post(path, params).then(res => {
        if (res.data.code === 0) {
          resolve(res.data)
        } else if (res.data.code === 500) {
          Message({
            message: res.data.msg,
            type: 'error'
          })
          reject(res.data)
        }
      })
    })
  }
}
