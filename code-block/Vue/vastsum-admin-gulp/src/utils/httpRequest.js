import Vue from 'vue'
import Axios from 'axios'
import router from '@/router'
import qs from 'qs'
import { Message, Notification } from 'element-ui'
import {
  clearLoginInfo,
  removeEmptyProp
} from './utils'

const axiosInstance = Axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(response => {
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
  return response
}, error => {
  const title = '服务正在升级，请稍后再试！'
  Notification({
    title: title,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
axiosInstance.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
axiosInstance.adornParams = (params = {}) => {
  return params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
axiosInstance.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * [http description]
 * @param  {[String]} method [get/post/delete/put]
 * @param  {[String]} url    [api/list]
 * @param  {[Object | Array]} data   [发送的数据]
 * @param  {[Boolean]} type   [是否发送空字符，默认不发送，false]
 * @return {[Promise]}        [返回一个promise]
 */
var http = function(method, url, data = {}, type = false) {
  if (!type) {
    data = removeEmptyProp(data)
  }
  var params = {}
  if (method.toUpperCase() === 'GET') {
    params = axiosInstance.adornParams(data)
  } else {
    data = axiosInstance.adornData(data)
  }
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: axiosInstance.adornUrl(url),
      method,
      data,
      params
    }).then(({ data }) => {
      if (data.code === 0) {
        resolve(data)
      } else {
        if (data.code === 500) {
          Message({
            message: data.msg,
            type: 'error'
          })
        }
        reject(data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
export default axiosInstance
export {
  http
}
