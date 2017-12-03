常用正则表达式收集

## 手机号检验
```js
function validatMobile(str) {
  return /^1[3|4|5|7|8|9][0-9]{9}$/.test(str)
}
```

## 验证邮箱格式
```js
function validatEmai(str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}
 ```

## 验证身份证格式
```js
function validatId(str) {
  return /^\d{15}|\d{}18$/.test(str)
}
 ```

## 验证是否是纯数字
```js
function validat(str) {
  return /^[0-9]*$/.test(str)
}
 ```
 
## 以字母开头，长度在6-18之间，只能包含字符、数字和下划线
```js
function validat(str) {
  return /^[a-zA-Z]\w{5,17}$/.test(str)
}
 ```