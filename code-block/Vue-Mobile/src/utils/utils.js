import Vue from 'vue'
import store from '@/store'
import storage from 'good-storage'
import dictionary from './dictionary.json'
import addressArr from './address'

import originJsonp from 'jsonp'

export function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

// 校验字段
function verify(rules, send) {
  /**
   rules: Object
   eg: 
    {
      mobile: {
        // 'required' or 正则 or function
        rule: function(input){
          return true or false
        }, 
        // String
        msg: '请输入正确的手机号'
      }
    }
   */
  for (let prop in rules) {
    const rule = rules[prop].rule;
    const msg = rules[prop].msg;
    const val = send[prop];
    const res = validate(val, rule);
    if (!res) {
      Toast(msg); // 反馈插件
      return false;
    }
  }
  return true;

  function validate(val, rule) {
    if (rule === 'required') {
      return !(val === '' || val === null || val === undefined)
    } else if (typeof rule === 'function') {
      return rule(val);
    } else if (!rule.test(val)) {
      return false;
    }
    return true;
  }
}

export function setCookie(name, value, exdays) {
  exdays = exdays || 1;
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

export function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg)
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

export function delCookie(name) {
  setCookie(name, "", -1);
}

/**
 * 获取字典数组或字典对应label
 * @param {*} value
 * @param {*} name
 */
export function searchDictionary(value, name) {
  if (arguments.length === 1) return dictionary[value].options || []; //  如果参数只有一个，获取对应的arr
  if (!dictionary[name]) return
  const arr = dictionary[name].options || [];
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value == value) {
      result = arr[i].label
      break
    }
  }
  return result;
}

/**
 * 日期格式化
 * @param {*} date
 * @param {*} format
 */
export const dateFmt = function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 金额格式化
 * @param {*} s
 * @param {*} n
 */
export function currencyFmt(value, n) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  if (isNaN(Number(value))) return '';
  n = n > 0 && n <= 20 ? n : 2;
  // eslint-disable-next-line
  value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  const l = value.split('.')[0];
  const r = value.split('.')[1];
  return '\u00a5' + l + '.' + r;
}

/**
 * 自定义数组字典，获取label
 * @param {*} value
 * @param {*} arr
 */
export function seeLabel(value, arr) {
  if (!arr) {
    return '';
  }
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      result = arr[i].label;
      break;
    }
  }
  return result;
}

/**
 * 保留两位小数
 * @param {*} num
 */
export function dealNumber(num) { // 处理小数
  return Math.round(num * 100) / 100
}

/**
 * 判断数据类型
 * @param {*} dataType
 */
export function typeOf(dataType) {
  return Object.prototype.toString.call(dataType).slice(8, -1).toLowerCase()
}

/**
 * 对象深拷贝
 * @param {*} data
 */
function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 删除 参数对象中为空的属性
 * @param {*} data
 */
export function removeEmptyProp(data) {
  var o = deepCopy(data);
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (!o[k]) {
        delete o[k];
      }
    } else if (typeOf(o[k]) === 'object') {
      removeEmptyProp(o[k])
    }
  }
  return o
}

/**
 * 获取地区 code 数组
 * @param {*} childCode
 */
export function getAreaCodeArr(childCode) {
  if (!childCode) return;
  const arr = [];
  const len = addressArr.length
  for (var i = 0; i < len; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          arr.push(children[j].parentCode);
          break;
        }
      }
      if (arr.length) {
        arr.push(childCode);
        break;
      }
    }
  }
  return arr;
}

/**
 * 获取地区信息
 * @param {*} childCode
 */
export function getAreaInfo(childCode) {
  const length = addressArr.length
  let str = '';
  for (var i = 0; i < length; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          str = parent.label + children[j].label
          return str
        }
      }
    } else if (parent.value === childCode) {
      str = parent.label
      return str
    }
  }
  return str;
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('token')
  storage.session.clear()
  store.commit('resetStore')
}
