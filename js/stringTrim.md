删除字符串首尾空格函数封装。

## 代码示例
```js
export const stringTrim = function (string) {
  const reg = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g')
  return string.replace(reg, '')
}
```

## 使用方法
```js
import { stringTrim } from './stringTrim'

stringTrim(' 1024 ') // 1024
```