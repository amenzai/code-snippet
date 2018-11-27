以下是平常写项目常用的代码段。

**1、判断设备类型**

```js
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)) {
   location.replace('/m/index');
}
```

**2、PC 通用 template**

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>template</title>
    <meta name="renderer" content="webkit">
    <meta name="apple-mobile-web-app-title" content="My App" > 
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="Author" content="">
    <meta name="Keywords" content="">
    <meta name="Description" content="">
    <link rel="shortcut icon" type="image/ico" href="favicon.ico" />
    <link rel="stylesheet" href="css/reset.css">
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
 <body>
     <div>
         xxx
     </div>
     <script type="text/javascript"
      src="//code.jquery.com/jquery-1.11.0.min.js">
    </script>
    <script>
        window.jQuery ||
          document.write(
            '<script src="lib/jquery-1.11.0.min.js" type="text/javascript"><\/script>'
          );
    </script>
</body>
```

**3、swiper 简单使用**

```js
// <div class="swiper-container">
//   <ul class="swiper-wrapper">
//     <li class="swiper-slide">
//       <a href="javascript:;" class="img1"></a>
//     </li>
//     <li class="swiper-slide">
//       <a href="javascript:;" class="img2"></a>
//     </li>
//     <li class="swiper-slide">
//       <a href="javascript:;" class="img3"></a>
//     </li>
//   </ul>
//   <!-- Add Pagination -->
//   <div class="swiper-pagination"></div>
// </div>

/*swiper*/
var swiper = new Swiper('.swiper-container', {
spaceBetween: 30,
autoplay: 5000,
speed: 300,
effect: 'fade',
pagination: '.swiper-pagination',
paginationClickable: true
});
```

**4、复制页面文本**

```js
function copyToClipboard(txt) {
  if (window.clipboardData) {
    window.clipboardData.setData('text', txt)
  } else {
    document.oncopy = function (e) {
      e.clipboardData.setData('text', txt)
      e.preventDefault()
      document.oncopy = null
    }
    document.execCommand('Copy')
  }
  alert('已复制', txt)
}
```

**5、控制金额输入不得大于两位小数**

```js
function clearNoNum(amount) {
  amount = amount.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  amount = amount.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  amount = amount
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  amount = amount.replace(
    /^(\-)*(\d+)\.(\d\d).*$/,
    '$1$2.$3'
  ) // 只能输入两个小数
  if (amount.indexOf('.') < 0 && amount != '') {
    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    amount = parseFloat(amount)
  }
}
```

**6、获取某个范围的随机整数**

```js
function rd(n, m) {
  var c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}
```

**7、自动滚动文本**

```html
  <marquee height="85px" onmouseover="this.stop();" onmouseout="this.start();" direction="down" scrollamount="2">
    <p></p>
    <p><span>黎** 查询机电展</span><span>百度第1页价格2.0/天</span></p>
    <p><span>苏** 查询LED</span><span>百度第1页价格5.8/天</span></p>
    <p><span>苏** 查询节能照明</span><span>百度第1页价格12.8/天</span></p>
    <p><span>梁** 查询自动焊接专用设备</span><span>百度第一页价格5.6元/天</span></p>
    <p><span>田** 查询强力电永磁吸盘</span><span>百度第一页价格4.8元/天</span></p>
  </marquee>
```

**8、微信中生成可以长按识别的二维码**

```js
// 1.引入JS库
// <script src="jquery-1.8.3.js" type="text/javascript" charset="utf-8"></script>   
// <script src="jquery.qrcode.min.js" type="text/javascript" charset="utf-8"></script>    
// 2.在页面创建一个空的div;
// <div id="qrDiv"></div>    
// 3.生成二维码
// $("#qrDiv").qrcode({   width: 120, //宽度   height:120, //高度   text: "需要生成的二维码内容" //任意内容   });    
// 注意：这个时候生成的二维码在微信中长安没任何反应，因为qrcode生成的是canvas标签而不是img标签
// 4.将canvas标签转换为img标签
//从 canvas 提取图片 image   
function convertCanvasToImage(canvas) {
  //新Image对象，可以理解为DOM   
  var image = new Image();
  // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持   
  // 指定格式 PNG   
  image.src = canvas.toDataURL("image/png");
  return image;
}
// 获取网页中的canvas对象   
var mycanvas1 = document.getElementsByTagName('canvas')[0];
// 将转换后的img标签插入到html中   
var img = convertCanvasToImage(mycanvas1);
$('#imagQrDiv').append(img); //imagQrDiv表示你要插入的容器id 
```

**9、移动端字号行高：**

```
1.41176471 * 17
1.5 * 16
1.71428571 * 14
```

**10、移动端 css reset**

https://meyerweb.com/eric/tools/css/reset/

add some item

```stylus
// from vue-music
a {
  color: #7e8c8d;
  -webkit-backface-visibility: hidden;
  text-decoration: none;
}
body {
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
// base.styl
body, html {
  line-height: 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: $color-background;
  color: $color-text;
}
```

**11、PC css reset** 

https://necolas.github.io/normalize.css/

```scss
// from vastsum-admin-static
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.15;
  color: #303133;
  background-color: #fff;
}
a {
  color: mix(#fff, $--color-primary, 20%);
  text-decoration: none;
  &:focus,
  &:hover {
    color: $--color-primary;
    text-decoration: underline;
  }
}
img {
  vertical-align: middle;
}


/* Utils
------------------------------ */
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.mb10 {
  margin-bottom: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
```
**12、弹出QQ**
```js
$('.qqbox').on('click', 'p', function() {
   var qqnumber = $(this).data('qn');
   window.open("http://wpa.qq.com/msgrd?v=3&uin=" + qqnumber + "&site=qq&menu=yes");
});
$('#gotop').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 500)
});
```
**13、utils**
```js
// import dictionary from './dictionary.js'
// import addressArr from './address'

/**
 * 日期格式化
 * @param {*} date 
 * @param {*} fmt 
 */
const dateFormat = function(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 金额格式化
 * @param {*} s
 * @param {*} n
 */
function currencyFormat(value, n) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  if (isNaN(Number(value))) return '';
  n = n > 0 && n <= 20 ? n : 2;
  // eslint-disable-next-line
  value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  const l = value.split('.')[0];
  const r = value.split('.')[1];
  return '\u00a5' + l + '.' + r;
}

/**
 * 获取字典数组或字典对应label
 * @param {*} value
 * @param {*} name
 */
function searchDictionary(value, name) {
  if (arguments.length === 1) return dictionary[value].options || []; //  如果参数只有一个，获取对应的arr
  if (!dictionary[name]) return
  const arr = dictionary[name].options || [];
  let result = ''
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value == value) {
      result = arr[i].label
      break
    }
  }
  return result;
}

/**
 * 自定义数组字典，获取label
 * @param {*} value
 * @param {*} arr
 */
function seeLabel(value, arr) {
  if (!arr) return '';
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].itemCode === value) {
      result = arr[i].itemName;
      break;
    }
  }
  return result;
}

/**
 * 判断数据类型
 * @param {*} dataType
 */
function typeOf(dataType) {
  return Object.prototype.toString.call(dataType).slice(8, -1).toLowerCase()
}

/**
 * 对象深拷贝
 * @param {*} data
 */
function deepCopy(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

/**
 * 删除 参数对象中为空的属性
 * @param {*} data
 */
function removeEmptyProp(data) {
  var o = deepCopy(data);
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (!o[k]) {
        delete o[k];
      }
    } else if (typeOf(o[k]) === 'object') {
      removeEmptyProp(o[k])
    }
  }
  return o
}

/**
 * 获取地区 code 数组
 * @param {*} childCode
 */
function getAreaCodeArr(childCode) {
  if (!childCode) return;
  const arr = [];
  const len = addressArr.length
  for (var i = 0; i < len; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          arr.push(children[j].parentCode);
          break;
        }
      }
      if (arr.length) {
        arr.push(childCode);
        break;
      }
    }
  }
  return arr;
}

/**
 * 获取地区信息
 * @param {*} childCode
 */
function getAreaInfo(childCode) {
  const length = addressArr.length
  let str = '';
  for (var i = 0; i < length; i++) {
    var parent = addressArr[i];
    var children = parent.children;
    if (children) {
      const len = children.length
      for (var j = 0; j < len; j++) {
        if (children[j].value === childCode) {
          str = parent.label + children[j].label
          return str
        }
      }
    } else if (parent.value === childCode) {
      str = parent.label
      return str
    }
  }
  return str;
}

function setCookie(name, value, exdays) {
  exdays = exdays || 1;
  var d = new Date();
  d.setDate(d.getDate() + exdays);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  var arr = document.cookie.match(reg)
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

function delCookie(name) {
  setCookie(name, "", -1);
}
```

**14、tabjs**
```js
$('.tabnav').on('click', 'li', function(event) {
  var targetSelector = '#' + $(this).data('target');
  $(this).addClass('active').siblings().removeClass('active');
  $(targetSelector).addClass('active').siblings().removeClass('active');
});
```
**15、toTop**
```js
// 回到顶部
 // $('.gotop').click(function() {
 //   $('html, body').animate({scrollTop: 0}, 300)
 // });
// 原生实现
 var leader = 0,
   target = 0,
   timerOut = null,
   timer = null;
 // leader 起始位置  target  目标位置
 window.onscroll = function() {
   clearTimeout(timerOut)
   timerOut = setTimeout(() => {
     console.log(123);
     leader = document.documentElement.scrollTop; // 把 卷去的头部 给  起始位置
   }, 100);

 }
 $('.gotop').click(function() {
   timer = setInterval(function() {
     leader = leader + (target - leader) / 10;
     window.scrollTo(0, leader); // 去往页面中的某个位置
     if (leader == target) {
       clearInterval(timer);
     }
   }, 20);
 });
```
