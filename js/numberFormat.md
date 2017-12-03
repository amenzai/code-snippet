数值处理函数封装。

## 代码示例
```js
// 获取传入的 min max 之间的整数值
export const numberRandom = function (min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 将传输的数值处理成所需位数（开头加0）
export const numberPad = function (source, length = 2) {
  let pre = ""
  const negative = source < 0
  const string = String(Math.abs(source))
  if (string.length < length) {
      pre = (new Array(length - string.length + 1)).join('0')
  }
  return (negative ?  "-" : "") + pre + string
}

// 将传输的数值处理成以所需个数逗号分隔形式
export const numberComma = function (source, length = 3) {
  source = String(source).split(".");
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
  return source.join(".");
}
```

## 使用方法
```js
import { numberRandom, numberPad, numberComma } from './numberFormat.js'

numberComma(21342132) // 21,342,132
numberComma(21342132, 4) // 2134,2132
numberComma(21342132.234) // 21,342,132.234

numberPad(1) // 01
numberPad(234, 4) // 0234

numberRandom(1, 7) // 2
```