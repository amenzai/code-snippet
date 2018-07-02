## 数据结构
```js
// 栈
// 书，盘子
function Stack() {
  var items = []; // 需要一种数据结构来保存栈里的元素
  this.push = function (element) { // 添加一个（或几个）新元素到栈顶。
    items.push(element);
  };
  this.pop = function () { // 移除栈顶的元素，同时返回被移除的元素。
    return items.pop();
  };
  this.peek = function () { // 返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
    return items[items.length - 1];
  };
  this.isEmpty = function () { // 如果栈里没有任何元素就返回true，否则返回false。
    return items.length == 0;
  };
  this.size = function () { // ：返回栈里的元素个数
    return items.length;
  };
  this.clear = function () { // 移除栈里的所有元素。
    items = [];
  };
  this.print = function () {
    console.log(items.toString());
  };
}
var stack = new Stack(); // 初始化Stack类

/**
 * 数值进制转换    // 用它解决一些计算机科学中的问题。
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

// 小姐
// 数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素，
// （尽管我们已经学过的JavaScript的Array类方法可以帮我们做这些事，但背后的情况同样是这样）。

// 链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。
// 要想访问链表中间的一个元素，需要从起点（表头）开始迭代列表直到找到所需的元素。
// 火车 车厢 
// 链表
function LinkedList() {
  var Node = function (element) { // {1}
    this.element = element;
    this.next = null;
  };
  var length = 0; // {2}
  var head = null; // {3}
  this.append = function (element) {}; // 向列表尾部添加一个新的项
  this.insert = function (position, element) {}; // 向列表的特定位置插入一个新的项。
  this.removeAt = function (position) {}; // 从列表的特定位置移除一项。
  this.remove = function (element) {}; // 从列表中移除一项。
  this.indexOf = function (element) {}; // 返回元素在列表中的索引。如果列表中没有该元素则返回-1。
  this.isEmpty = function () {}; // 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
  this.size = function () {};  // 返回链表包含的元素个数。与数组的length属性类似。
  this.toString = function () {}; // 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
  this.print = function () {};
}
var list = new LinkedList();
// add
this.append = function (element) {
  var node = new Node(element), // 创建Node项
    current;
  if (head === null) { //列表中第一个节点 // 第一种场景，链表为空
    head = node;
  } else { // 要向列表的尾部添加一个元素，首先需要找到最后一个元素。 我们只有第一个元素的引用
    current = head; // 定义一个指向列表中current项的变量（每次循环时使用）
    //循环列表，直到找到最后一项
    while (current.next) {
      current = current.next;
    }
    //找到最后一项，将其next赋为node，建立链接
    current.next = node; 
  }
  length++; //更新列表的长度
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
```