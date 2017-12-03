# Cookie封装

包含获取、设置、删除

## 代码示例
```js

const Cookie = {}

var decode = decodeURIComponent;
var encode = encodeURIComponent;

Cookie.get = function (name, options) {
  validateCookieName(name);

  if (typeof options === 'function') {
    options = {
      converter: options
    };
  } else {
    options = options || {};
  }

  var cookies = parseCookieString(document.cookie, !options['raw']);
  return (options.converter || same)(cookies[name]);
};

Cookie.set = function (name, value, options) {
  validateCookieName(name);

  options = options || {};
  var expires = options['expires'];
  var domain = options['domain'];
  var path = options['path'];

  if (!options['raw']) {
    value = encode(String(value));
  }

  var text = name + '=' + value;

  // expires
  var date = expires;
  if (typeof date === 'number') {
    date = new Date();
    date.setDate(date.getDate() + expires);
  }
  if (date instanceof Date) {
    text += '; expires=' + date.toUTCString();
  }

  // domain
  if (isNonEmptyString(domain)) {
    text += '; domain=' + domain;
  }

  // path
  if (isNonEmptyString(path)) {
    text += '; path=' + path;
  }

  // secure
  if (options['secure']) {
    text += '; secure';
  }

  document.cookie = text;
  return text;
};


Cookie.remove = function (name, options) {
  options = options || {};
  options['expires'] = new Date(0);
  return this.set(name, '', options);
};

function parseCookieString(text, shouldDecode) {
  var cookies = {};

  if (isString(text) && text.length > 0) {

    var decodeValue = shouldDecode ? decode : same;
    var cookieParts = text.split(/;\s/g);
    var cookieName;
    var cookieValue;
    var cookieNameValue;

    for (var i = 0, len = cookieParts.length; i < len; i++) {

      // Check for normally-formatted cookie (name-value)
      cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
      if (cookieNameValue instanceof Array) {
        try {
          cookieName = decode(cookieNameValue[1]);
          cookieValue = decodeValue(cookieParts[i]
            .substring(cookieNameValue[1].length + 1));
        } catch (ex) {
          // Intentionally ignore the cookie -
          // the encoding is wrong
        }
      } else {
        // Means the cookie does not have an "=", so treat it as
        // a boolean flag
        cookieName = decode(cookieParts[i]);
        cookieValue = '';
      }

      if (cookieName) {
        cookies[cookieName] = cookieValue;
      }
    }

  }

  return cookies;
}

// Helpers

function isString(o) {
  return typeof o === 'string';
}

function isNonEmptyString(s) {
  return isString(s) && s !== '';
}

function validateCookieName(name) {
  if (!isNonEmptyString(name)) {
    throw new TypeError('Cookie name must be a non-empty string');
  }
}

function same(s) {
  return s;
}

export Cookie

// 引入
import { cookie } from './cookie.js'
```

## API

### cookie.set(name, value, [options])

**简介**

设置 cookie 值。参数 options 可选，可以有以下属性：path（字符串）、domain（字符串）、 expires（数值或日期对象）、raw（布尔值）。当 raw 为真值时，在设置 cookie 值时，不会进行 URI 编码。

**示例**

```js
cookie.set('foo', 3)

cookie.set('bar', 4, {
  domain: 'example.com',
  path: '/',
  expires: 30
})
```

### cookie.get(name, [options])

**简介**

获取 cookie 值。options 参数可选，取值如下：

- converter 转换函数。如果所获取的 cookie 有值，会在返回前传给 converter 函数进行转换。
- 选项对象。对象中可以有两个属性：converter 和 raw. raw 是布尔值，为真时，不会对获取到的 cookie 值进行 URI 解码。

*注：如果要获取的 cookie 键值不存在，则返回 undefined.*

**示例**

```js
// setup
document.cookie = 'foo=1'
document.cookie = 'bar=2'

cookie.get('foo')
// return '1'

cookie.get('bar', function(s) { return parseInt(s); } )
// return 2
```

### cookie.remove(name, [options])

**简介**

移除指定的 cookie.

**示例**

```js
cookie.remove('foo')

cookie.remove('bar', {
  domain: 'example.com',
  path: '/'
})
```

---

## 另一种写法（容易理解）

### setCookie
```js
function setCookie(name, value, expires, path, domain, secure) {
  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires)
    cookie += '; expires=' + expires.toGMTString();
  if (path)
    cookie += '; path=' + path;
  if (domain)
    cookie += '; domain=' + domain;
  if (secure)
    cookie += '; secure=' + secure;
  document.cookie = cookie;
}

```

### getCookie
```js
function getCookie() {
  var cookie = {};
  var all = document.cookie;
  if (all === '')
    return cookie;
  var list = all.split('; ');
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var p = item.indexOf('=');
    var name = item.substring(0, p);
    name = decodeURIComponent(name);
    var value = item.substring(p + 1);
    value = decodeURIComponent(value);
    cookie[name] = value;
  }
  return cookie;
}
```

### removeCookie
```js
function removeCookie(name, path, domain) {
  document.cookie = name + '=' + '; path=' + path + '; domain=' + domain + '; max-age=0';
}
```