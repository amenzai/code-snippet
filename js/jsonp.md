JSONP的一些实现。

## 原生JSONP
```javascript
/**
 * 原生JSON的实现方法
 * @param  {string}   url      请求地址
 * @param  {object}   data     对象参数
 * @param  {Function} callback 回调函数
 * @return {无}            
 */
function(url, data, callback) {
  // 判断是否传入data
  if (typeof data == 'function') {
    callback = data;
  }
  // 将对象data序列化
  var querystring = url.indexOf('?') == -1 ? '?' : '&';
  for (var key in data) {
    querystring += key + '=' + data[key] + '&';
  }
  // 自定义回调函数名称
  var fnSuffix = Math.random().toString().replace('.', '');
  var cbFuncName = 'jsonp_cb_' + fnSuffix;
  // 拼接到url里
  querystring += 'callback=' + cbFuncName;
  // 创建script标签
  var scriptElement = document.createElement('script');
  scriptElement.src = url + querystring;
  // 将script标签插入页面
  document.body.appendChild(scriptElement);
  // 返回同名回调函数，然后调用
  window[cbFuncName] = function(data) {
    // data为请求返回的数据
    // 执行回调
    callback(data);
    // 移除创建的script标签
    document.body.removeChild(scriptElement);
  };
}
```

## jquery JSONP
```javascript
// $ 为Jquery构造函数
$.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {});
```

## npm JSONP

引入依赖包使用，并且使用了promiseh和ES6
```javascript
// jsonp.js

// 引入JSOPN包
import originJsonp from 'jsonp'

// 导出封装好的JSONP，便于调用
export default function (url, data, option) {
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

// 序列化对象参数，拼接到url上
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

---

// api.js

// 导入封装好的JSONP
import jsonp from 'common/js/jsonp'

// 导出接口
export function getTopList() {
  // 定义基本地址
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  // 基本的对象参数，如果多处使用可以封装起来
  const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }
  const options = {
    param: 'jsonpCallback'
  }
  // 得到最终要的对象参数
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
```

