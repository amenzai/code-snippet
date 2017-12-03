日期格式化、以及日期范围每一项日期获取代码块

## 代码示例
```js
export const dateFormat = function (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
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
```

## 使用方法
```js
import { dateFormat } from './dateFormat.js'
dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

## 获取日期范围之间每一个日期（基于dateFormat）

### 代码示例
```js
import { dateFormat } from './dateFormat.js'

// 返回值是一个数组，每一项为传入的开始与结束日期之间的日期，不包括结束日期
export const dateRange = function (start, end, format = 'YYYY-MM-DD') {
  let rs = []
  let startTime = new Date(start).getTime()
  let endTime = new Date(end).getTime()

  while (startTime <= endTime) {
    rs.push(dateFormat(startTime, format))
    startTime += 24 * 60 * 60 * 1000
  }
  return rs
}
```

### 使用方法
```js
import { dateRange } from './dateRange.js'
dateRange(new Date(), new Date('2020/12/12'), 'YYYY-MM-DD HH:mm:ss')
```
