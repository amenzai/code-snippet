;
(function(window, document, $) {
  //  所有的公共方法都写在这里
  var utils = {
    getLabel: function(value, name) { // 字典查找
      var dictionary = window.config.dictionary;
      if (arguments.length === 1) return dictionary[value].options || []; //  如果参数只有一个，获取对应的arr
      var arr = dictionary[name] ? dictionary[name].options : [];
      var length = arr.length
      for (var i = 0; i < length; i++) {
        if (arr[i].value == value) {
          return arr[i].label
        }
      }
      return '';
    },
    seeLabel: function(value, arr) { // 字典查找
      var length = arr.length
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == value) {
          return arr[i].label
        }
      }
      return '';
    },
    getQQ: function(qq) {
      var v = $.isArray(qq) ? qq[Math.floor(Math.random() * qq.length)] : qq;
      window.open("http://wpa.qq.com/msgrd?v=3&uin=" + v + "&site=qq&menu=yes");
    },
    currency: function(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      if (!s && s !== 0) {
        return '';
      }
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
      var l = s.split('.')[0],
        r = s.split('.')[1];
      return '\u00a5' + ' ' + l + '.' + r;
    },
    getQs: function(name) {
      var str = window.location.search.slice(1);
      var arr = str ? str.split('&') : [];
      for (var i = 0; i < arr.length; i++) {
        var cur = arr[i].split('=');
        if (name === cur[0]) {
          return cur[1];
        }
      }
      return undefined;
    },
    jump: function(url, query, type) {
      var result = '';
      if (query === undefined) {
        window.location.href = url;
        return;
      }
      query = query || {};
      for (var k in query) {
        result += '&' + k + '=' + encodeURIComponent(query[k])
      }
      result = url + '?' + result.slice(1);
      if (type) {
        window.open(result, '_blank')
      } else {
        window.location.href = result;
      }
    },
    dateFmt: function(date, format) {
      if (!date) return '';
      date = new Date(date);
      var paddNum = function(num) {
          num += ''
          return num.replace(/^(\d)$/, '0$1')
        }
        // 指定格式字符
      var cfg = {
        yyyy: date.getFullYear(),
        yy: date.getFullYear().toString().substring(2),
        M: date.getMonth() + 1,
        MM: paddNum(date.getMonth() + 1),
        d: date.getDate(),
        dd: paddNum(date.getDate()),
        hh: paddNum(date.getHours()),
        mm: paddNum(date.getMinutes()),
        ss: paddNum(date.getSeconds())
      }
      format || (format = 'yyyy-MM-dd hh:mm:ss')
      return format.replace(/([a-z])(\1)*/ig, function(m) {
        return cfg[m]
      })
    },
    trimObject: function(data) {
      var obj = JSON.parse(JSON.stringify(data));
      for (var k in obj) {
        if (typeof obj[k] === 'string' && obj[k].trim() === '') {
          delete obj[k];
        }
      }
      return obj;
    },
    setCookie: function(name, value, exdays) {
      exdays = exdays || 1;
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
    },
    getCookie: function(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
      } else {
        return null;
      }
    },
    delCookie: function(name) {
      this.setCookie(name, "", -1);
    },
    uniqueArr: function(arr) {
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i]);
        }
      }
      return res;
    },
    validateMobile: function(str) {
      return /^1[3|4|5|7|8|9][0-9]{9}$/.test(str);
    },
    validateEmail: function(str) {
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    },
    isDisabled: function(el, bool) { // el 为jquery元素  bool:布尔值
      el.prop('disabled', bool);
    }
  }
  window.utils = utils;
  window.$getLabel = utils.getLabel;

})(window, document, jQuery)
