var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  console.log('request start', request.url)
  if (request.url === '/') {
    var content = fs.readFileSync('./test.html', 'utf-8') // 设置编码读取的就是字符串，否则是二进制格式
    response.writeHead(200, {
      "Content-Type": "text/html"
    }); // 设置返回内容类型
    response.end(content);
    // response.writeHead(301, { // 301 永久跳转，并缓存到本地 302 临时跳转
    //   "Location": "/new"
    // });
    // response.end('123');
    // response.writeHead(200, {
    //   "Content-Type": "image/jpg",
    //   "connection": "close" //.. 关闭长连接
    // }); 
    // response.writeHead(200, {
    //   "Content-Type": "text/html",
    //   "connection": "close",
    //   "Link": "</test.jpg>; as=image; rel=preload" // </test.jpg> 中的/test.jpg 是html中引入的绝对地址的图片，实现的功能是服务器主动推送
    // });
    // response.end(content);
    
  } else if (request.url === '/file.txt') {
    var etag = request.headers['If-None-Match']
    if (etag === '777') {
      response.writeHead(304, {
        "Content-Type": "text/plain",
        "Cache-Control": "max-age=10000000, no-cache",
        "Last-Modified": "123",
        "Etag": "777"
      }); // 设置返回内容类型
      response.end('');
    } else {
      response.writeHead(200, {
        "Content-Type": "text/plain",
        "Cache-Control": "max-age=10000000, no-cache",
        "Last-Modified": "123",
        "Etag": "777"
      }); // 设置返回内容类型
      response.end('12345');
    }
  }
}).listen(2000);
console.log('listen in 2000')