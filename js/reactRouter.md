# React Router 的使用

## 简单使用

```bash
# 安装
$ npm install -S react-router
```
```js
// 使用
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));
```
用户访问根路由/（比如http://www.example.com/），组件APP就会加载到document.getElementById('app')。

## 嵌套路由

```js
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```
访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件。

App组件要写成下面的样子。

```js
export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})
```
子路由也可以不写在Router组件里面，单独传入Router组件的routes属性。

```js
let routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>
```

## path 属性

Route组件的path属性指定路由的匹配规则。

```js
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
```
上面代码中，当用户访问/inbox/messages/:id时，会加载下面的组件。
```js
<Inbox>
  <Message/>
</Inbox>
```

## 通配符

```js
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

此外，URL的查询字符串/foo?bar=baz，可以用this.props.location.query.bar获取。

## IndexRoute 

```js
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

## Redirect 组件

```js
<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```

## IndexRedirect 组件
```js
<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```

## Link
```js
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
}
```

前页面的链接的class会包含active。

```js
<Link to="/about" activeClassName="active">About</Link>
<Link to="/repos" activeClassName="active">Repos</Link>
```
在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写。

```js
import { browserHistory } from 'react-router';
browserHistory.push('/some/path');
```

## IndexLink
```js
<IndexLink to="/" activeClassName="active">
  Home
</IndexLink>
```

## histroy 属性
Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。

history属性，一共可以设置三种值。

- browserHistory
- hashHistory
- createMemoryHistory

## 路由的钩子

每个路由都有Enter和Leave钩子，用户进入或离开该路由时触发。

```js
<Route path="about" component={About} />
＜Route path="inbox" component={Inbox}>
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```
