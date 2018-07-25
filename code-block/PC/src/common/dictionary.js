;
(function(window) {
  var dictionary = {
    optimizeLogType: {
      description: '优化日志类型',
      options: [
        { value: 1, label: '关键词布局' },
        { value: 2, label: '站内优化' },
        { value: 3, label: '站外优化' },
        { value: 4, label: '分析报告' },
        { value: 5, label: '外链' },
        { value: 6, label: '原创内容' },
        { value: 7, label: '月度总结(含下月计划)' },
        { value: 0, label: '其他' }
      ]
    }
  }
  window.config.dictionary = dictionary;
})(window)
