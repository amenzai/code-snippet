ES6简单总结

### 定义常量使用 const

### 块级作用域定义变量使用 let

### 使用数组项给变量赋值（对象也是如此）
```js 
const [first, second] = arr;

// 定义的变量名要与属性名一致
const {first, ...second} = obg;
```

### 给对象添加属性使用Object.assign(obg,{a,1})
这是浅拷贝

对象属性定义使用简洁表达式

### 使用扩展运算符（...）拷贝数组。（对象也是如此）
深拷贝
```js 
const arrCopy = [...arr];
const objCopy = {...obj};
```

### 计算属性

```js
const name = 'tom'; 
const obj = {[name]: 'hello'} // {tom:'hello'}
```

### 使用Array.from方法，将类似数组的对象转为数组。
```js 
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

### 立即执行函数使用箭头函数
```js
() => {}
```

### 不要在函数体内使用arguments变量，使用rest运算符（...）代替。

因为rest运算符显式表明你想要获取参数，而且arguments是一个类似数组的对象，而rest运算符可以提供一个真正的数组。
```js 
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 使用默认值语法设置函数参数的默认值。
```js 
function handleThings(opts = {}) {
  // ...
}
```

### Map结构

```js
const arr = [['tom',1],['jack',2]]
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
  // tom
  // jack
}

for (let value of map.values()) {
  console.log(value);
  // 1
  // 2
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
  // tom 1
  // jack 2
}
```

### Set结构

```js
const array = [1,2,3,4,2,4,1]
// 去除数组的重复成员
[...new Set(array)] // [1,2,3,4]
```


### 总是用Class，取代需要prototype的操作。因为Class的写法更简洁，更易于理解。
```js 
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}
// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```

### 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。
```js 
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}
// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

### Promise

```js

// 异步加载图片
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}

// ajax promise封装
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

### 模块导入、导出语法使用ES6语法
```js 
import .... from ...
export
export default
如果模块默认输出一个函数，函数名的首字母应该小写。
如果模块默认输出一个对象，对象名的首字母应该大写。
```

### 使用Eslint
```bash
# 安装
$ npm i -g eslint
# 然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。
$ npm i -g eslint-config-airbnb
$ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
# 最后，在项目的根目录下新建一个.eslintrc文件，配置ESLint。
{
  "extends": "eslint-config-airbnb"
}
```

检验文件

```bash
eslint index.js
```


