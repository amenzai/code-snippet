import {
  searchDictionary,
  seeLabel,
  dateFmt,
  currencyFmt,
  dealNumber,
  isAuth,
  clearLoginInfo,
  getAreaCodeArr,
  getAreaInfo
} from './utils'

import constant from './constant'

// import http from './httpRequest'
import axiosInstance from './httpRequest'

// import storage from 'good-storage'

export default {
  install(Vue) {
    Vue.prototype.$getDicList = searchDictionary;
    Vue.prototype.$dateFilter = dateFmt;
    Vue.prototype.$CONSTANT = constant;
    Vue.prototype.$currency = currencyFmt;
    Vue.prototype.$seeLabel = seeLabel;
    Vue.prototype.$dealNumber = dealNumber;
    Vue.prototype.isAuth = isAuth;
    Vue.prototype.$clearLoginInfo = clearLoginInfo;
    // Vue.prototype.$http = http;
    Vue.prototype.$http = axiosInstance;
    // Vue.prototype.$storage = storage;
    Vue.prototype.$getAreaCodeArr = getAreaCodeArr // 获取地区code
    Vue.prototype.$getAreaInfo = getAreaInfo // 获取地区信息

    Vue.filter('getLabel', searchDictionary);
    Vue.filter('seeLabel', seeLabel);
    Vue.filter('currency', currencyFmt);
    Vue.filter('dateFilter', dateFmt);
    Vue.filter('getAreaInfo', getAreaInfo);
  }
}
