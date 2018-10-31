import Vue from 'vue'
import router from '@/router'
// import store from '@/store'
import dictionary from './dictionary.json'
import addressArr from './address'

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookie.delete('token')
  window.sessionStorage.clear()
  // store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
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
  if (!arr) return '';
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].itemCode === value) {
      result = arr[i].itemName;
      break;
    }
  }
  return result;
}

/**
 * elementui reset form
 * @param {*} formName
 */
export function resetForm(formName) {
  this.$refs[formName] && this.$refs[formName].resetFields()
}

/**
 * elementui validate form
 * @param {*} formName
 */
export function validateForm(formName) {
  let valid = false;
  this.$refs[formName].validate((v) => {
    valid = v
  });
  if (!valid) {
    return false;
  }
  return true;
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
function typeOf(dataType) {
  return Object.prototype.toString.call(dataType).slice(8, -1).toLowerCase()
}

/**
 * 对象深拷贝
 * @param {*} data
 */
export function deepCopy(data) {
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
