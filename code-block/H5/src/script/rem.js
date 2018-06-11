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
