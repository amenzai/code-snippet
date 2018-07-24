
待更新...

```html
<ul> 
  <li><a href="#/" class="button button-glow button-border button-rounded button-primary">turn white</a></li> 
  <li><a href="#/orange" class="button button-glow button-rounded button-highlight">turn orange</a></li> 
  <li><a href="#/purple" class="button button-glow button-rounded button-royal">turn purple</a></li> 
</ul> 
```

```js
function Router() {
  this.routes = {};
  this.currentUrl = '';
}
Router.prototype.route = function (path, callback) {
  this.routes[path] = callback || function () {};
};
Router.prototype.refresh = function () {
  this.currentUrl = location.hash.slice(1) || '/';
  this.routes[this.currentUrl]();
};
Router.prototype.init = function () {
  window.addEventListener('load', this.refresh.bind(this), false);
  window.addEventListener('hashchange', this.refresh.bind(this), false);
}
window.Router = new Router();
window.Router.init();
var content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
  content.style.backgroundColor = color;
}
Router.route('/', function () {
  changeBgColor('white');
});
Router.route('/orange', function () {
  changeBgColor('orange');
});
Router.route('/purple', function () {
  changeBgColor('purple');
});
```
