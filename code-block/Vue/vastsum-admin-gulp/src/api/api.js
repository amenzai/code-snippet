// import http from '@/utils/httpRequest'
import { http } from '@/utils/httpRequest.js'
import config from '@/utils/config'
const isDev = process.env.NODE_ENV === 'development'

export const getCaptchaPath = url => {
  return (isDev ? '/proxyApi' : config.productHost) + url
}
export const login = params => http('POST', '/sys/login', params)
export const loginOut = params => http('POST', '/sys/loginout', params)
export const getUserInfoApi = params => http('GET', '/sys/user/info', params)
export const getMenuNav = params => http('GET', '/sys/menu/nav', params)
