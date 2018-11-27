// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import config from './config'
import { Toast } from 'vant'
import qs from 'qs'
import {
  clearLoginInfo,
  removeEmptyProp
} from '@/utils/utils'

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
  // config.headers['Authorization'] = Vue.cookie.get('token') // 请求头带上token
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中'
  });
  return config
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(function (response) {
  Toast.clear()
  if (response.status === 200) {
    if (response.data.code === 401) { // 401, token失效
      clearLoginInfo()
      router.push({
        name: 'login'
      })
    } else if (response.data.code === 403) { // 403，页面无权访问
      
    }
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Toast.clear()
  Toast.fail('服务正在升级，请稍后再试！');
  return Promise.reject(error)
})

export default {
  get: function (path, params, type) {
    let url
    if (!params) {
      url = path
    } else {
      if (!type) { // type为true不过滤空字符串的发送
        params = removeEmptyProp(params)
      }
      url = path + '?' + qs.stringify(params)
    }
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else if (res.data.code === 500) {
          setTimeout(() => {
            Toast.fail(res.data.message);
          }, 500)
          reject(res.data)
        }
      })
    })
  },
  post: function (path, params, type) {
    if (!params) {
      params = {}
    }
    if (!type) { // type为true不过滤空字符串的发送
      params = removeEmptyProp(params)
    }
    return new Promise((resolve, reject) => {
      axios.post(path, params).then(res => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else if (res.data.code === 500) {
          setTimeout(() => {
            Toast.fail(res.data.message);
          }, 500)
          reject(res.data)
        }
      })
    })
  }
}
