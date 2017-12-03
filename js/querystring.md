url 参数解析函数封装

## 代码示例
```js
const QueryString = {}

QueryString.escape = encodeURIComponent;

QueryString.unescape = function(s) {
  return decodeURIComponent(s.replace(/\+/g, ' '));
};

QueryString.stringify = function(obj, sep, eq, arrayKey) {
  if (!isPlainObject(obj)) return '';
  sep = sep || '&';
  eq = eq || '=';
  arrayKey = arrayKey || false;
  var buf = [],
    key, val;
  var escape = QueryString.escape;
  for (key in obj) {
    if (!hasOwnProperty.call(obj, key)) continue;
    val = obj[key];
    key = QueryString.escape(key);

    if (isPrimitive(val)) {
      buf.push(key, eq, escape(val + ''), sep);
    } else if (isArray(val) && val.length) {
      for (var i = 0; i < val.length; i++) {
        if (isPrimitive(val[i])) {
          buf.push(
            key,
            (arrayKey ? escape('[]') : '') + eq,
            escape(val[i] + ''),
            sep);
        }
      }
    } else {
      buf.push(key, eq, sep);
    }
  }

  buf.pop();
  return buf.join('');
};


QueryString.parse = function(str, sep, eq) {
  if (typeof str === 'undefined') {
    str = document.location.search
  }
  var ret = {};

  if (typeof str !== 'string' || trim(str).length === 0) {
    return ret;
  }

  str = str.replace(/^\?/, '');

  var pairs = str.split(sep || '&');
  eq = eq || '=';
  var unescape = QueryString.unescape;

  for (var i = 0; i < pairs.length; i++) {

    var pair = pairs[i].split(eq);
    var key = unescape(trim(pair[0]));
    var val = unescape(trim(pair.slice(1).join(eq)));

    var m = key.match(/^(\w+)\[\]$/);
    if (m && m[1]) {
      key = m[1];
    }

    if (hasOwnProperty.call(ret, key)) {
      if (!isArray(ret[key])) {
        ret[key] = [ret[key]];
      }
      ret[key].push(val);
    } else {
      ret[key] = m ? [val] : val;
    }
  }

  return ret;
};

// Helpers

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var isArray = Array.isArray || function(val) {
  return toString.call(val) === '[object Array]';
};
var trim = String.prototype.trim ?
  function(str) {
    return (str == null) ?
      '' :
      String.prototype.trim.call(str);
  } :
  function(str) {
    return (str == null) ?
      '' :
      str.toString().replace(/^\s+/, '').replace(/\s+$/, '');
  };

function isPlainObject(o) {
  return o &&
    toString.call(o) === '[object Object]' &&
    'isPrototypeOf' in o;
}

function isPrimitive(o) {
  return o !== Object(o);
}

export QueryString
```

## 使用方法
```js
import { QueryString } from 'vux'

QueryString.parse('a=b&c=d') // {a:'b',c:'d'}, 默认参数为 location.search

QueryString.stringify({a:'b',c:'d'}) // 'a=b&c=d'，注意不支持复杂嵌套的结构
```

## 另一种写法（简单）

```js
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
```