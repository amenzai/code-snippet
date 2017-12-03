Jquery常用API整理

# 全局工具方法

## $.noConflict()
为了避免冲突，$.noConflict方法允许将美元符号与jQuery脱钩。

## $.trim()

移除字符串头部和尾部多余的空格
```js
$.trim('   Hello   ') // Hello
```

## $.contains()
返回一个布尔值，表示某个DOM元素（第二个参数）是否为另一个DOM元素（第一个参数）的下级元素。
```js
$.contains(document.documentElement, document.body); 
// true

$.contains(document.body, document.documentElement); 
// false
```

## $.each()

遍历数组和对象，返回原始对象
```js
$.each([ 52, 97 ], function( index, value ) {
  console.log( index + ": " + value );
});
// 0: 52 
// 1: 97 

var obj = {
  p1: "hello",
  p2: "world"
};
$.each( obj, function( key, value ) {
  console.log( key + ": " + value );
});
// p1: hello
// p2: world
```

## $.map()

遍历数组和对象，但是会返回一个新对象
```js
var a = ["a", "b", "c", "d", "e"];
a = $.map(a, function (n, i){
  return (n.toUpperCase() + i);
});
// ["A0", "B1", "C2", "D3", "E4"]
```

## $.inArray()

返回一个值在数组中的位置，如果该值不在数组中，则返回-1。
```js
var a = [1,2,3,4];
$.inArray(4,a) // 3
```

## $.extend()

将多个对象合并进第一个对象
```js
var o1 = {p1:'a',p2:'b'};
var o2 = {p1:'c'};
$.extend(o1,o2);
o1.p1 // "c"
```
另一种用法是生成一个新对象，用来继承原有对象
```js
var o1 = {p1:'a',p2:'b'};
var o2 = {p1:'c'};
var o = $.extend({},o1,o2);
o
// Object {p1: "c", p2: "b"}
```

默认情况下，extend方法生成的对象是“浅拷贝”。

如果想要“深拷贝”，可以在extend方法的第一个参数传入布尔值true。

```js

var o1 = {p1:['a','b']};
var o2 = $.extend({},o1); // 浅拷贝
var o3 = $.extend(true,{},o1); // 深拷贝
o1.p1[0]='c';
o2.p1 // ["c", "b"]
o3.p1 // ["a", "b"]
```

## $.data()

在DOM节点上储存数据。
```js
// 存入数据
$.data(document.body, "foo", 52 );

// 读取数据
$.data(document.body, "foo");

// 读取所有数据
$.data(document.body);
```

## $.removeData()

移除$.data方法所储存的数据。
```js
$.data(div, "test1", "VALUE-1");
$.removeData(div, "test1");
```

## $.makeArray()

将一个类似数组的对象，转化为真正的数组。
```js
var a = $.makeArray(document.getElementsByTagName("div"));
```

## $.merge()

将一个数组（第二个参数）合并到另一个数组（第一个参数）之中。
```js
var a1 = [0,1,2];
var a2 = [2,3,4];
$.merge(a1, a2);
a1
// [0, 1, 2, 2, 3, 4]
```

## $.now()

回当前时间距离1970年1月1日00:00:00 UTC对应的毫秒数，等同于(new Date).getTime()。
```js
$.now()
// 1388212221489
```

## 判断数据类型的方法

以下方法皆返回一个布尔值

- jQuery.isArray()：是否为数组。
- jQuery.isEmptyObject()：是否为空对象（不含可枚举的属性）。
- jQuery.isFunction()：是否为函数。
- jQuery.isNumeric()：是否为数值（整数或浮点数）。
- jQuery.isPlainObject()：是否为使用“{}”或“new Object”生成的对象，而不是浏览器原生提供的对象。
- jQuery.isWindow()：是否为window对象。
- jQuery.isXMLDoc()：判断一个DOM节点是否处于XML文档之中。
- jQuery.type()：相当于Object.prototype.toString.call({}).slice(8,-1).toLowerCase();。

代码示例

```js
$.isEmptyObject({}) // true
$.isPlainObject(document.location) // false
$.isWindow(window) // true
$.isXMLDoc(document.body) // false
$.type(/test/) // "regexp"
```

## Ajax操作

### $.ajax()

```js
$.ajax(url[, options])

$.ajax({
  async: true,
  url: '/url/to/json',
  type: 'GET',
  data : { id : 123 },
  dataType: 'json',
  timeout: 30000,
  success: successCallback,
  error: errorCallback,
  complete: completeCallback,
  statusCode: {
        404: handler404,
        500: handler500
  }
})
function successCallback(json) {
  $('<h1/>').text(json.title).appendTo('body');
}
function errorCallback(xhr, status){
  console.log('出问题了！');
}
function completeCallback(xhr, status){
  console.log('Ajax请求已结束。');
}
```

### $.get(), $.post()
get方法和post方法的参数相同，第一个参数是服务器网址，该参数是必需的，其他参数都是可选的。第二个参数是发送给服务器的数据，第三个参数是操作成功后的回调函数。
```js
$.get('/data/people.html', function(html){
  $('#target').html(html);
});
$.post('/data/save', {name: 'Rebecca'}, function (resp){
  console.log(JSON.parse(resp));
});
```

### $.getJSON()

当服务器端返回JSON格式的数据，可以用这个方法代替$.ajax方法。
```js
$.getJSON('url/to/json', {'a': 1}, function(data){
  console.log(data);
});
```

### $.getScript()

从服务器端加载一个脚本文件
```js
$.getScript( "ajax/test.js", function (data, textStatus, jqxhr){
  console.log( data ); // test.js的内容
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
});
```
getScript是ajax方法的简便写法，因此返回的是一个deferred对象，可以使用deferred接口。
```js
jQuery.getScript("/path/to/myscript.js")
  .done(function() {
    // ...
  })
  .fail(function() {
    // ...
});
```

### JSON
ajax方法可以发出JSONP请求，方法是在对象参数中指定dataType为JSONP。

```js
$.ajax({
  url: '/data/search.jsonp',
  data: {q: 'a'},
  dataType: 'jsonp',
  success: function(resp) {
    $('#target').html('Results: ' + resp.results.length);
  }
});)

// 或者
$.getJSON('/data/search.jsonp?q=a&callback=?',
  function(resp) {
    $('#target').html('Results: ' + resp.results.length);
  }
);
```

---

# 最好的加载方式

```js
<script type="text/javascript"
  src="//code.jquery.com/jquery-1.11.0.min.js">
</script>
<script>
window.jQuery ||
  document.write(
    '<script src="js/jquery-1.11.0.min.js" type="text/javascript"><\/script>'
  );
</script>
```

---

# jQuery实例对象的方法

## 基本

### each方法，map方法
each方法接受一个函数作为参数，依次处理集合中的每一个元素。
```js 
$('li').each(function( index, element) {
  $(element).prepend( '<em>' + index + ': </em>' );
});
```
map方法的用法与each方法完全一样，区别在于each方法没有返回值，只是对每一个元素执行某种操作，而map方法返回一个新的jQuery对象。
```js 
$("input").map(function (index, element){
    return $(this).val();
})
.get()
.join(", ")
```
上面代码表示，将所有input元素依次取出值，然后通过get方法得到一个包含这些值的数组，最后通过数组的join方法返回一个逗号分割的字符串。

## 结果集的过滤方法

### eq方法，get方法

### first方法，last方法
first方法返回结果集的第一个成员，last方法返回结果集的最后一个成员。

### next方法，prev方法
next方法返回紧邻的下一个同级元素，prev方法返回紧邻的上一个同级元素。

### parent方法，parents方法，children方法

parent方法返回当前元素的父元素，parents方法返回当前元素的所有上级元素（直到html元素）。
children方法返回选中元素的所有子元素。

### siblings方法，nextAll方法，prevAll方法
siblings方法返回当前元素的所有同级元素。
nextAll方法返回当前元素其后的所有同级元素，prevAll方法返回当前元素前面的所有同级元素。

### find方法
find方法返回当前元素的所有符合条件的下级元素。

### end方法
end方法用于返回原始的结果集。

## DOM相关方法
jQuery的许多方法都是取值器（getter）与赋值器（setter）的合一，即取值和赋值都是同一个方法，不使用参数的时候为取值器，使用参数的时候为赋值器。

### html方法和text方法
html方法返回该元素包含的HTML代码，text方法返回该元素包含的文本。

### addClass方法，removeClass方法，toggleClass方法
addClass方法用于添加一个类，removeClass方法用于移除一个类，toggleClass方法用于折叠一个类（如果无就添加，如果有就移除）。

### css方法
css方法用于改变CSS设置。
```js
// get
$('h1').css('fontSize');

// set 
$('li').css('padding-left', '20px')
// 或者
$('li').css({
  'padding-left': '20px'
});
```

### val方法
val方法返回结果集第一个元素的值，或者设置当前结果集所有元素的值。

### prop方法，attr方法
首先，这里要区分两种属性。

一种是网页元素的属性，比如a元素的href属性、img元素的src属性。这要使用attr方法读写。
```js
// 读取属性值
$('textarea').attr(name)
//写入属性值
$('textarea').attr(name, val)
```
另一种是DOM元素的属性，比如tagName、nodeName、nodeType等等。这要使用prop方法读写。
```js 
// 读取属性值
$('textarea').prop(name)
// 写入属性值
$('textarea').prop(name, val)
```

```js 
$(input[type=checkbox]).attr("checked") // "checked"
$(input[type=checkbox]).prop("checked") // true
```

### removeProp方法，removeAttr方法
removeProp方法移除某个DOM属性，removeAttr方法移除某个HTML属性。

### data方法
data方法用于在一个DOM对象上储存数据。

## 添加、复制和移动网页元素的方法

### append方法，appendTo方法
append方法将参数中的元素插入当前元素的尾部。
appendTo方法将当前元素插入参数中的元素尾部。

### prepend方法，prependTo方法
prepend方法将参数中的元素，变为当前元素的第一个子元素。
prependTo方法将当前元素变为参数中的元素的第一个子元素。

### after方法，insertAfter方法 before方法，insertBefore方法

### clone方法
clone方法克隆当前元素。

### remove方法，detach方法，replaceWith方法
remove方法移除并返回一个元素，取消该元素上所有事件的绑定。detach方法也是移除并返回一个元素，但是不取消该元素上所有事件的绑定。
replaceWith方法用参数中的元素，替换并返回当前元素，取消当前元素的所有事件的绑定。

## 动画效果方法

- show：显示当前元素。
- hide：隐藏当前元素。
- toggle：显示或隐藏当前元素。
- fadeIn：将当前元素的不透明度（opacity）逐步提升到100%。
- fadeOut：将当前元素的不透明度逐步降为0%。
- fadeToggle：以逐渐透明或逐渐不透明的方式，折叠显示当前元素。
- slideDown：以从上向下滑入的方式显示当前元素。
- slideUp：以从下向上滑出的方式隐藏当前元素。
- slideToggle：以垂直滑入或滑出的方式，折叠显示当前元素。

使用示例

```js 
$('.hidden').show();
$('.hidden').show(300);
$('.hidden').show('slow');

$('p').fadeOut(300, function() {
  $(this).remove();
});
```

### animate方法

使用示例
```
$('a.top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});

$('div').animate({
    left: '+=50', // 增加50
    opacity: 0.25,
    fontSize: '12px'
  },
  300, // 持续时间
  function() { // 回调函数
     console.log('done!');
  }
);
```

### stop方法，delay方法
stop方法表示立即停止执行当前的动画。
delay方法接受一个时间参数，表示暂停多少毫秒后继续执行。

# 事件处理

- click
- keydown
- keypress
- keyup
- mouseover
- mouseout
- mouseenter
- mouseleave
- scroll
- focus
- blur
- resize
- hover

如果不带参数调用这些方法，就是触发相应的事件，从而引发回调函数的运行。

简单示例
```js 
$('li').click(function (e){
  console.log($(this).text());
});
```

## on方法，trigger方法，off方法
on方法是jQuery事件绑定的统一接口。事件绑定的那些简便方法，其实都是on方法的简写形式。
on方法接受两个参数，第一个是事件名称，第二个是回调函数。

```js 
$('li').on('click', function (e){
  console.log($(this).text());
});
```
on方法允许一次为多个事件指定同样的回调函数。
```js 
$('input[type="text"]').on('focus blur', function (){
  console.log('focus or blur');
});
```
on方法还可以为当前元素的某一个子元素，添加回调函数。
```js 
$('ul').on('click', 'li', function (e){
  console.log(this);
});
```

## trigger方法
trigger方法用于触发回调函数，它的参数就是事件的名称。

```js 
$('li').trigger('click')
```

## off方法
off方法用于移除事件的回调函数。

## event对象
event对象有以下属性：

- type：事件类型，比如click。
- which：触发该事件的鼠标按钮或键盘的键。
- target：事件发生的初始对象。
- data：传入事件对象的数据。
- pageX：事件发生时，鼠标位置的水平坐标（相对于页面左上角）。
- pageY：事件发生时，鼠标位置的垂直坐标（相对于页面左上角）。

event对象有以下方法：

- preventDefault：取消浏览器默认行为。
- stopPropagation：阻止事件向上层元素传播。

## one方法
one方法指定一次性的回调函数，即这个函数只能运行一次。这对提交表单很有用。
```js
$("#button").one( "click", function() { return false; } );
```

---

# Jquery插件开发

示例
```js 
;(function ($, window) {
  $.fn.myPlugin = function() {
    // Do your awesome plugin stuff here
  };
}(jQuery, window));
```
```js 
(function ($){
  $.fn.maxHeight = function (){
    var max = 0;
  // 下面这个this，指的是jQuery对象实例
    this.each(function() {
    // 回调函数内部，this指的是DOM对象
      max = Math.max(max, $(this).height());
    });
    return max;
  };
})(jQuery);
```
大多数情况下，插件应该返回jQuery对象，这样可以保持链式操作。
```js 
(function ($){
  $.fn.greenify = function (){
  this.css("color", "green");
  return this;
  };
})(jQuery);
$("a").greenify().addClass("greenified");
```

