<meta charset="utf-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="yes" name="apple-touch-fullscreen" />
<meta content="telephone=no" name="format-detection" />
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<title>@title</title>
<link rel="stylesheet" href="/css/common.css">
<script>
	(function (d, w) {
		const doc = d.documentElement;
		let tid

		function rem() {
			const width = Math.min(doc.getBoundingClientRect().width, 768);
			doc.style.fontSize = width / 7.5 + 'px';
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