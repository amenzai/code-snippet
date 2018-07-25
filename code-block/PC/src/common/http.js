;
(function(window, document, $) {
  /**
   * method: post/get
   * url: 'api/v1/...'
   * cb: 成功回调
   * ecb: 失败回调
   */
  var http = function(method, url, params, cb, ecb) {
    if (cb === undefined && typeof params == 'function') {
      cb = params;
      params = undefined;
    }
    if (typeof params == 'function' && typeof cb == 'function' && ecb === undefined) {
      cb = params;
      ecb = cb;
      params = undefined;
    }
    url = config.apiBase + url;
    $.ajax({
      url: url,
      type: method,
      cache: false,
      async: true,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      data: params,
      timeout: 5000,
      traditional: true, //如果你想要用传统的方式来序列化数据，那么就设置为true
      xhrFields: {
        withCredentials: true
      },
      error: function(jqXHR, textStatus, errorMsg) {
        layui.layer.msg('请求超时或网络有问题', { icon: 5 });
      },
      success: function(data, textStatus, jqXHR) {
        if (data.code === 200) {
          cb && cb(data);
        } else if (data.code === 401) {
          window.location.href = '/timeout.html'
        } else {
          layui.layer.msg(data.message || '服务端报错', { icon: 5 });
          ecb && ecb(data);
        }
      }
    })
  }

  http.get = function(url, params, cb, ecb) {
    return http('GET', url, params, cb, ecb)
  }
  http.post = function(url, params, cb, ecb) {
    return http('POST', url, params, cb, ecb)
  }
  window.$http = http;

})(window, document, jQuery)
