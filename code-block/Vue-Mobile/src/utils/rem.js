(function (d, w) {
  const doc = d.documentElement;
  let tid
  // Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
  // 返回值是一个 DOMRect 对象，包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
  function rem() {
    const width = Math.min(doc.getBoundingClientRect().width, 768);
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