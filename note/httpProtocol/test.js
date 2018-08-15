var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  console.log('request start', request.url)
  var content = fs.readFileSync('./list.json', 'utf-8') 
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "http://localhost:2000",
    "Content-Type": "application/json"
  });
  response.end(content);

}).listen(2002);
console.log('listen in 2002')