# react使用

## 脚手架安装

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm config set registry https://registry.npm.taobao.org

$ cnpm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start

# 弹出配置文件
$ npm run eject 
```

## HTML模板
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      // ** Our code goes here! **
    </script>
  </body>
</html>
```

## JSX语法

遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。

### ReactDOM.render()
```js
// 1
ReactDOM.render( <span>Hello React!</span>, document.getElementById('example') );

// 2
var names = ['Alice', 'Emily', 'Kate'];
ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);

// 3
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

## 组件语法
```js
// 创建组件类
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);

// 2
class MyTitle extends React.Component {
  render() {
    return <h1>Hello World</h1>;
  }
};

ReactDOM.render(
  <MyTitle/>,
  document.getElementById('example')
);
```

注意事项：

- class MyTitle extends React.Component是 ES6 语法，表示自定义一个MyTitle类，该类继承了基类React.Component的所有属性和方法。
- React 规定，自定义组件的第一个字母必须大写，比如MyTitle不能写成myTitle，以便与内置的原生类相区分。
- 每个组件都必须有render方法，定义输出的样式。
- <MyTitle/>表示生成一个组件类的实例，每个实例一定要有闭合标签，写成<MyTilte></MyTitle>也可。

## 组件传参

### this.props对象
```js
class MyTitle extends React.Component {
    render() {
      return <h1 style={{color: this.props.color}}>Hello World</h1>;
    }
  };

  ReactDOM.render(
    <MyTitle color="red" />,
    document.getElementById('example')
  );
```
组件的属性可以在组件类的 this.props 对象上获取。

### this.props.children

```js
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.getElementById('example')
);
```
这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。更多的 React.Children 的方法，请参考官方文档。

### PropTypes

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

```js
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
```
上面的Mytitle组件有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。如果不满足条件控制台会报错。

getDefaultProps 方法可以用来设置组件属性的默认值。

```js
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.render(
  <MyTitle />,
  document.body
);
```

## 获取真实的DOM节点(ref)

```js
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});
ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```

## 组件的状态(this.state)
组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 。
```js
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});
ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

---

```js
class MyTitle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: '访问者'
    };
  }

  handleChange(e) {
    let name = e.target.value;
    this.setState({
      name: name
    });
  }

  render() {
    return <div>
      <input type="text" onChange={this.handleChange.bind(this)} />
      <p>你好，{this.state.name}</p>
    </div>;
  }
};

ReactDOM.render(
  <MyTitle/>,
  document.getElementById('example')
);
```
this.setState方法用来重置this.state，每次调用这个方法，就会引发组件的重新渲染。

由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

## 表单
用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取。

```js
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});
ReactDOM.render(<Input/>, document.body);
```

## 组件实战
```js
class MyTitle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      text: 'World'
    };
  }

  handleClick() {
    this.setState({
      text: 'Clicked'
    });
  }

  render() {
    return <h1 onClick={this.handleClick.bind(this)}>
      {'Hello ' + this.state.text}
    </h1>;
  }
};

ReactDOM.render(
  <MyTitle/>,
  document.getElementById('example')
);
```

## 组件生命周期
组件的生命周期分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

- componentWillMount()：组件加载前调用
- componentDidMount()：组件加载后调用
- componentWillUpdate(): 组件更新前调用
- componentDidUpdate(): 组件更新后调用
- componentWillUnmount()：组件卸载前调用
- componentWillReceiveProps()：组件接受新的参数时调用

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

我们可以利用这些钩子，自动完成一些操作。
```js
class MyList extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        loading: true,
        error: null,
        data: null
      };
    }

    componentDidMount() {
      const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
      $.getJSON(url)
       .done(
        (value) => this.setState({
          loading: false,
          data: value
        })
      ).fail(
        (jqXHR, textStatus) => this.setState({
          loading: false,
          error: jqXHR.status
        })
      );
    }

    render() {
      if (this.state.loading) {
        return <span>Loading...</span>;
      } else if (this.state.error !== null) {
        return <span>Error: {this.state.error}</span>;
      } else {
        /* 你的代码填入这里 */
        const data = this.state.data.items
        var result = []
        data.forEach(item => {
          result.push(<li>{item.name}</li>)
        })
        return (
          <div>
            <p>API 数据获取成功</p>
            <ul>
              {result}
            </ul>
          </div>
        );
      }
    }
  };

  ReactDOM.render(
    <MyList/>,
    document.getElementById('example')
  );
```

# 第三方组件库使用