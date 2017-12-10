# css rem使用方法

全局设置基本字号：

```js
<script type="text/javascript">
  document.getElementsByTagName('html')[0].style.fontSize = window.screen.width / 10 + 'px';
</script>
```

```less
.fs(@px) {
  font-size: unit(@px / 37.5, rem);
}

.w(@px) {
  width: unit(@px / 37.5, rem);
}

.h(@px) {
  height: unit(@px / 37.5, rem);
}

.lh(@px) {
  line-height: unit(@px / 37.5, rem);
}

.mt(@px) {
  margin-top: unit(@px / 37.5, rem);
}
.ml(@px) {
  margin-left: unit(@px / 37.5, rem);
}
.mr(@px) {
  margin-right: unit(@px / 37.5, rem);
}
.mb(@px) {
  margin-bottom: unit(@px / 37.5, rem);
}
.pt(@px) {
  padding-top: unit(@px / 37.5, rem);
}
.pl(@px) {
  padding-left: unit(@px / 37.5, rem);
}
.pr(@px) {
  padding-right: unit(@px / 37.5, rem);
}
.pb(@px) {
  padding-bottom: unit(@px / 37.5, rem);
}
```