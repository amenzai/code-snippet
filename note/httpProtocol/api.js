var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  console.log('request start', request.url)
  var content = null
  if (request.url.search('/api/jianshu/header') !== -1) {
    content = fs.readFileSync('./jianshu/headerList.json', 'utf-8') 
  } else if (request.url === '/api/jianshu/home') {
    content = fs.readFileSync('./jianshu/home.json', 'utf-8') 
  } else if (request.url.search('/api/jianshu/homeList') !== -1) {
    content = fs.readFileSync('./jianshu/homeList.json', 'utf-8') 
  } else if (request.url.search('/api/jianshu/detail') !== -1) {
    content = fs.readFileSync('./jianshu/detail.json', 'utf-8') 
  } else if (request.url.search('/api/jianshu/login') !== -1) {
    content = fs.readFileSync('./jianshu/login.json', 'utf-8') 
  }

  if (request.url.search('/api/quna/index') !== -1) {
    content = fs.readFileSync('./quna/index.json', 'utf-8') 
  }else if (request.url.search('/api/quna/city') !== -1) {
    content = fs.readFileSync('./quna/city.json', 'utf-8') 
  } else if (request.url.search('/api/quna/detail') !== -1) {
    content = fs.readFileSync('./quna/detail.json', 'utf-8') 
  }
  response.writeHead(200, {
    // "Access-Control-Allow-Origin": "http://localhost:8088",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  });
  response.end(content);

}).listen(8100);
console.log('listen in 8100')