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

11、PC css reset 

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