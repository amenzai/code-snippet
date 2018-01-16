# 每天杂乱的笔记

JS动画三要素：
- **对象**：DOM对象
- **属性**：width height opacity left....
- **定时器**：setInterval setTimeout requestAnimationFrame (clearInterval clearTimeout cancelAnimationFrame)
setInterval(func,delay) setTimeout(func,delay) requestAnimationFrame(func)

常见动画：形变、位移、旋转、透明度

------

mongodb使用指南：

- 下载：https://www.mongodb.com/download-center#community
- 安装完以后，找到安装目录，比如D:\mongodb\bin(可以将其配置到环境变量)
- 配置文件形式启动
	- mongo.conf:
	dbpath=c:\MongoDB\database logpath=c:\MongoDB\logs\mongodb.log journal=true logappend=true port=27017
	- 启动并安装服务：mongod --config c:\MongoDB\etc\mongo.conf --install --serviceName "MongoDB"
	- 移除服务：mongod --config c:\MongoDB\etc\mongo.conf --remove
	- net start MongoDB 服务已经安装好，可以这样启动 
- 命令形式启动
	- mongod --dbpath c:\MongoDB\data --logpath c:\MongoDB\log\mongo.log --journal

------

node express mongodb 开发web后台接口

node调试：pm2 start demo.js

前后端联调：
- npm start 开启前端
- nodemon server.js 开启后端
- package.josn 配置 proxy属性，跨域处理

```bash
# 安装express
npm install express --save

# node应用自动刷新
npm install -g nodemon

nodemon demo.js

# mongodb使用
# 下载：mongodb.com

# 执行启动mongodb
mongod --config /user/local/etc/mongod.conf

# 认证方式启动
mongod -f /mongodb/etc/mongo.conf --auth

mongo

show dbs

# 给数据库添加管理员账号密码
use admin
db.createUser({user:"admin",pwd:"123456",roles:["root"]})
db.auth("admin", "123456")

# express 与 mongodb结合 用 mongoosel
npm install mongoose --save
```

```js
// demo.js

const express = require('express')
const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'（拷贝mongodb启动后的那个连接地址，imooc是个数据库名）
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
	console.log('mongo connect success')
})
// 类似于mysql的表 mongo里有文档、字段的概念，
const User = mongoose.model('user', new mongoose.Schema({
	user:{type:String,require:true},
	age:{type:Number,require:true}
}))
// 新增数据
// User.create({
// 	user:'xiaohua',
// 	age:12
// },function(err, doc){
// 	if (!err) {
// 		console.log(doc)
// 	}else{
// 		console.log(err)
// 	}
// })
// 新建app
// 删
// User.remove({age:18},function(err,doc){
// 	console.log(doc)
// })
// 改
// User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
// 	console.log(doc)
// })
const app = express()
app.get('/',function(req,res){
	res.send('<h1>Hello world</h1>')
})	
app.get('/data',function(req,res){
  // 查询数据
	User.findOne({user:'xiaoming'},function(err,doc){
		res.json(doc)
	})
})
// app.get('/delete',function(){

// })
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
```
------

项目部署-linux里node安装：
node官网，点击阿里云镜像，挑选对应服务器版本：
```bash
wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.xz
xz -d node-v8.9.3-linux-x64.tar.xz / tar -xzvy node-v8.9.3-linux-x64.tar.gz
tar -xvf node-v8.9.3-linux-x64.tar
ln -s /node-v8.9.3-linux-x64/bin/node /usr/local/bin/node
ln -s /node-v8.9.3-linux-x64/bin/npm /usr/local/bin/npm

# linux查看详细目录
ls -la

# 不推荐
# sudo apt-get install nodejs
# sudo apt-get install npm
```

------ 

Redux-router4:
[参考链接](http://618cj.com/react-router4-0%E8%B7%AF%E7%94%B1%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3api/)

```bash
# 安装
npm install react-router-dom --save
```

入门组件：
- BrowserRouter，包裹整个应用
- Router路由对应渲染的组件，可嵌套
- Link跳转用

```js
<BrowserRouter>
  <Link to="/">哈哈</Link>
  <Route path='/' exact component={Auth}></Route> // 完全匹配
  <Route path='/dashboard' component={Dashboard}></Route>
  <Redirect to='/dashboard'></Redirect>
</BrowserRouter>
```
其他组件：
- url参数，Router组件参数可用冒号标识参数
- Redirect组件 跳转
- Switch只渲染命中的第一个子Route组件

Route组件在匹配到对应组件后，组件内部this.props可以拿到一个关于路由信息的对象，它有三个属性：history match location

------

开发思路：
- Demo.js (一个组件)
	
```js
import React from 'react'
import { connect } from 'react-redux' // 引入redux

import { login,getUserData } from './demo.redux' // 引入action creater

import {Redirect} from 'react-router-dom' // 路由组件

import axios from 'axios

// 状态管理 state映射到props
@connect(
	state=>state.auth, // reducer中定义的state
	{login, getUserData} // action creater
)

class Demo extends React.Component{
	// constructor(props) {
	// 	super(props)
	// 	this.state={
	// 		data:{}
	// 	}
	// }
	componentDidMount() {
		this.props.getUserData()
		// axios.get('/data')
		// 	.then(res=>{
		// 		if (res.status===200) {
		// 			this.setState({data:res.data})
		// 		}
		// 	})	
	}
	render(){
		return (
			<div>
				<h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
				{ this.props.isAuth? <Redirect to='/dashboard' /> : null}
				<h2>你没有权限，需要登录才能看</h2>
				<button onClick={this.props.login}>登录</button>
			</div>
		)
	}
}

export default Demo

```

- demo.redux.js (定义reducer 和 action creater)

```js 
import axios from 'axios'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA='USER_DATA'
const initState = {
	isAuth:false,
	user:'李云龙',
	age:20
}
export function auth(state=initState,action){
	console.log(state,action)
	switch(action.type){
		case LOGIN:
			return {...state, isAuth:true}
		case LOGOUT:
			return {...state, isAuth:false}
		case USER_DATA:
			return {...state, user:action.payload.user,age:action.payload.age}
		default:	
			return state	
	}
}
// action
export function getUserData(){
	// dispatch用来通知数据修改
	return dispatch=>{
		axios.get('/data')
			.then(res=>{
				if (res.status===200) {
					dispatch(userData(res.data))
				}
			})
	}
}
export function userData(data){
	return {type:USER_DATA,payload:data}
}
export function login(){
	return {type:LOGIN}
}
export function logout(){
	return {type:LOGOUT}
}
```

- redux.js

```js
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({counter,auth})
```

- index.js

```js
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
```

------

