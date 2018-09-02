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

function setCookie(name, value, exdays) {
  exdays = exdays || 1;
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg)
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

function delCookie(name) {
  setCookie(name, "", -1);
}

function currencyFmt(value, n) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  if (isNaN(Number(value))) return '';
  n = n > 0 && n <= 20 ? n : 2;
  value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  const l = value.split('.')[0];
  const r = value.split('.')[1];
  return '\u00a5' + l + '.' + r;
}

function dateFmt(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
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

function removeEmptyProp(data, type) {
  var o = deepCopy(data);
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (o[k] === '' && !type) {
        delete o[k];
      }
    } else if (typeOf(o[k]) === 'object') {
      removeEmptyProp(o[k])
    }
  }
  return o
}


// 深拷贝 待定
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