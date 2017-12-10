# CSS Modules 简单用法

用到了webpack的css-loader插件

## 局部作用域

app.js

```js
import React from 'react';
import style from './App.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```

app.css

```css
.title {
  color: red;
}
```

构建后
```html
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>

<!-- app.css -->
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

## 全局作用域
CSS Modules 允许使用:global(.className)的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串。

App.css加入一个全局class

app.css

```css
.title {
  color: red;
}

:global(.title) {
  color: green;
}
```

app.js
```js
import React from 'react';
import styles from './App.css';

export default () => {
  return (
    <h1 className="title">
      Hello World
    </h1>
  );
};
```

