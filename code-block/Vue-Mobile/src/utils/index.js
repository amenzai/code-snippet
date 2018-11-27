import {
  jsonp,
  searchDictionary,
  seeLabel,
  dateFmt,
  currencyFmt,
  dealNumber,
  getAreaCodeArr,
  getAreaInfo
} from './utils'

import http from './http'

import storage from 'good-storage'

//  import CONSTANT from './constant'

export default {
  install(Vue) {
    Vue.prototype.$getDicList = searchDictionary;
    Vue.prototype.$dateFilter = dateFmt;
    Vue.prototype.$CONSTANT = constant;
    Vue.prototype.$currency = currencyFmt;
    Vue.prototype.$seeLabel = seeLabel;
    Vue.prototype.$dealNumber = dealNumber;
    Vue.prototype.$dateFilter = dateFmt
    Vue.prototype.$getAreaCodeArr = getAreaCodeArr // 获取地区code
    Vue.prototype.$getAreaInfo = getAreaInfo // 获取地区信息

    Vue.prototype.$http = http
    Vue.prototype.$storage = storage
    Vue.prototype.$jsonp = jsonp
    //  Vue.prototype.$CONSTANT = CONSTANT
    Vue.filter('getLabel', searchDictionary);
    Vue.filter('seeLabel', seeLabel);
    Vue.filter('currency', currencyFmt);
    Vue.filter('dateFilter', dateFmt);
    Vue.filter('getAreaInfo', getAreaInfo);
  }
}