WebSocket 是一种网络通信协议，很多高级功能都需要它。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

## WebSocket 握手
浏览器发出的 WebSocket 握手请求类似于下面的样子：
```
GET / HTTP/1.1
Connection: Upgrade
Upgrade: websocket
Host: example.com
Origin: null
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13
```
服务器的 WebSocket 回应如下
```
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Origin: null
Sec-WebSocket-Location: ws://example.com/
```

## 客户端的简单示例
```js
var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};

ws.onmessage = function(evt) {
  console.log('Received Message: ' + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log('Connection closed.');
};
```

## 客户端 API
### 构造函数 WebSocket
```js 
var ws = new WebSocket('ws://localhost:8080');
```
执行上面语句之后，客户端就会与服务器进行连接。

### webSocket.readyState
readyState属性返回实例对象的当前状态，共有四种。

- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

```js 
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

### webSocket.onopen
指定连接成功后的回调函数。
```js 
ws.onopen = function () {
  ws.send('Hello Server!');
}
```
如果要指定多个回调函数，可以使用addEventListener方法。
```js 
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

### webSocket.onclose
指定连接关闭后的回调函数。
```js 
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

### webSocket.onmessage
指定收到服务器数据后的回调函数
```js 
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```
注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。
```js 
ws.onmessage = function(event){
  if(typeOf event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```
除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。
```js 
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

### webSocket.send()
向服务器发送数据
```js 
// 发送文本
ws.send('your message');

// 发送 Blob 对象
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);

// 发送 ArrayBuffer 对象
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```
### webSocket.bufferedAmount
实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
```js 
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

### webSocket.onerror
指定报错时的回调函数
```js 
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```
## WebSocket 服务器
WebSocket 协议需要服务器支持