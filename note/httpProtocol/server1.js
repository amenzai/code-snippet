var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  console.log('request start', request.url)
  if (request.url === '/') {
    // response.writeHead(200, {
    //   "Content-Type": "text/html"
    // });
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:2000",
      "Access-Control-Allow-Headers": "X-Test-Cors",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Max-Age": "1728000"
    });
    response.end('8100 content');
  } else {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.end('123');
  }

}).listen(8100);
console.log('listen in 8100')