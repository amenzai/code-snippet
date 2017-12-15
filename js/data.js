// 栈
// 书，盘子
function Stack() {
  var items = [];
  this.push = function (element) {
    items.push(element);
  };
  this.pop = function () {
    return items.pop();
  };
  this.peek = function () {
    return items[items.length - 1];
  };
  this.isEmpty = function () {
    return items.length == 0;
  };
  this.size = function () {
    return items.length;
  };
  this.clear = function () {
    items = [];
  };
  this.print = function () {
    console.log(items.toString());
  };
}
var stack = new Stack();

/**
 * 数值进制转换
 * @param {*Number} decNumber 数值
 * @param {*Number} base 进制数
 */
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; //{6}
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; //{7}
  }
  return baseString;
}

// 队列
// 排队
function Queue() {
  var items = [];
  this.enqueue = function (element) {
    items.push(element);
  };
  this.dequeue = function () {
    return items.shift();
  };
  this.front = function () {
    return items[0];
  };
  this.isEmpty = function () {
    return items.length == 0;
  };
  this.clear = function () {
    items = [];
  };
  this.size = function () {
    return items.length;
  };
  this.print = function () {
    console.log(items.toString());
  };
}
var queue = new Queue();

// 优先队列
// 登飞机顺序
function PriorityQueue() {
  var items = [];

  function QueueElement(element, priority) { 
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      items.push(queueElement); 
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority <
          items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) { 
        items.push(queueElement);
      }
    }
  };
  //其他方法和默认的Queue实现相同
}

// 循环队列—
// 击鼓传花游戏
function hotPotato(nameList, num) {
  var queue = new Queue(); // {1}
  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]); // {2}
  }
  var eliminated = '';
  while (queue.size() > 1) {
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    eliminated = queue.dequeue(); // {4}
    console.log(eliminated + '在击鼓传花游戏中被淘汰。');
  }
  return queue.dequeue(); // {5}
}
var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
var winner = hotPotato(names, 7);
console.log('胜利者：' + winner);

// 链表
function LinkedList() {
  var Node = function (element) { // {1}
    this.element = element;
    this.next = null;
  };
  var length = 0; // {2}
  var head = null; // {3}
  this.append = function (element) {};
  this.insert = function (position, element) {};
  this.removeAt = function (position) {};
  this.remove = function (element) {};
  this.indexOf = function (element) {};
  this.isEmpty = function () {};
  this.size = function () {};
  this.toString = function () {};
  this.print = function () {};
}
var list = new LinkedList();
// add
this.append = function (element) {
  var node = new Node(element), //{1}
    current; //{2}
  if (head === null) { //列表中第一个节点 //{3}
    head = node;
  } else {
    current = head; //{4}
    //循环列表，直到找到最后一项
    while (current.next) {
      current = current.next;
    }
    //找到最后一项，将其next赋为node，建立链接
    current.next = node; //{5}
  }
  length++; //更新列表的长度 //{6}
};

// removeAt
this.removeAt = function (position) {
  //检查越界值
  if (position > -1 && position < length) { // {1}
    var current = head, // {2}
      previous, // {3}
      index = 0; // {4}
    //移除第一项
    if (position === 0) { // {5}
      head = current.next;
    } else {
      while (index++ < position) { // {6}
        previous = current; // {7}
        current = current.next; // {8}
      }
      //将previous与current的下一项链接起来：跳过current，从而移除它
      previous.next = current.next; // {9}
    }
    length--; // {10}
    return current.element;
  } else {
    return null; // {11}
  }
};

// insert
this.insert = function (position, element) {
  //检查越界值
  if (position >= 0 && position <= length) { //{1}
    var node = new Node(element),
      current = head,
      previous,
      index = 0;
    if (position === 0) { //在第一个位置添加
      node.next = current; //{2}
      head = node;
    } else {
      while (index++ < position) { //{3}
        previous = current;
        current = current.next;
      }
      node.next = current; //{4}
      previous.next = node; //{5}
    }
    length++; //更新列表的长度
    return true;
  } else {
    return false; //{6}
  }
};