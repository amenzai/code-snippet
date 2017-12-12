# redux基本用法

## 代码示例
```js
// 创建Store
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();

// view产生action
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// 发送action
store.dispatch(addTodo('Learn Redux'));

// 计算新的state
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});

----
// 每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```

### Reducer 的拆分
```js
import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;

---
// 子reducer放入一个文件，统一引入
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
```

## 流程解析

1. 用户发出 Action（store.dispatch(action);）
2. Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。（let nextState = todoApp(previousState, action);）
3. State 一旦有变化，Store 就会调用监听函数。（store.subscribe(listener);）
4. listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```js
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

## 异步需要中间件支持

### 中间件用法

```js
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

// createStore方法可以接受整个应用的初始状态作为参数，
// applyMiddleware是第三个参数
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
```

### 异步操作思路
1. 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
2. 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

```js
// 异步操作要发出三种 Action。
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }

// state改造  
let state = {
  // ... 
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 'xxxxxxx'
};

const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

## react-redux
