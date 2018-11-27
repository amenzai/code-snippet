<meta charset="utf-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="yes" name="apple-touch-fullscreen" />
<meta content="telephone=no" name="format-detection" />
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title>@title</title>
<link rel="stylesheet" href="css/common.css">
<script>
	(function (d, w) {
		var doc = d.documentElement;
		var tid
		// Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
		// 返回值是一个 DOMRect 对象，包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
		function rem() {
			var width = Math.min(doc.getBoundingClientRect().width, 768);
			doc.style.fontSize = width / 750 + 'px';
		}
		rem();
		w.addEventListener('resize', function () {
			clearTimeout(tid)
			tid = setTimeout(() => {
				rem()
			}, 300);
		});
	})(document, window);
</script>