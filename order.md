常用命令汇总

## 常用项目初始化

### Vue

1. 装node(npm包含其中)
使用`node -v` `npm -v` 验证是否安装成功
2. 全局安装vue-cli
`npm install -g vue-cli`
嫌慢的话，安装cnpm 
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`cnpm install -g vue-cli`
3. 初始化项目
`vue init webpack vue-demo`
`cd vue-demo`
`npm install or cnpm install`
4. 启动项目
`npm run dev`

### react

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

### wepy

```bash
# 安装工具
npm install wepy-cli -g

# 查看项目模板
wepy list

# 初始化项目
wepy init standard myproject

cd myproject
npm install

# 实时监控修改并编译
npm run dev (wepy build --watch)

# 打包
npm run build
```

## 开启服务

### http-server
```bash
hs -p 8888 -o
```

### browser-sync
```bash
# cmd要记得用双引号
browser-sync start --server --files "**/*"
```

## Bower常用命令

```bash
$ bower help

# 初始化一个Bower的配置文件(bower.json)
$ bower init

# 安装bower.json里的所有依赖
$ bower install

# 安装一个包（指定版本）
$ bower install bootstrap#1.4.5  

# GitHub shorthand
$ bower install desandro/masonry  

# Git endpoint
$ bower install git://github.com/user/package.git  

# URL
$ bower install http://example.com/script.js  

# 安装一个包并将其添加到配置文件
$ bower install bootstrap --save  

# 卸载一个包
$ bower uninstall bootstrap 

# 更新一个包
$ bower update bootstrap 

# 更新所有的包
$ bower update 

# .bowerrc 
{
  "directory" : "components",
  "json"      : "bower.json",
  "endpoint"  : "https://Bower.herokuapp.com",
  "searchpath"  : "",
  "shorthand_resolver" : ""
}
```

## Git常用命令

```bash
# 提交版本时的用户名
$ git config --global user.name "amenzai" 

# 提交版本时的邮箱
$ git config --global user.email "amenzai@qq.com" 

# 生成Github密匙
$ ssh-keygen -t rsa -C "amenzai@qq.com"

# 检查是否添加成功
$ ssh -T git@github.com 

# 定位到仓储文件夹目录
$ cd demo-project 
# 初始化本地仓储
$ git init 
# 添加忽略文件
$ echo .DS_Store >> .gitignore 
# 添加指定文件名的文件
$ git add README.md 
# 添加通配符匹配的文件
$ git add *.md 
# 添加所有未托管的文件（忽略.gitignore清单中的列表）
$ git add --all 
# 提交到本地版本库
$ git commit -m 'Initial commit(change log)' 
# 添加一个远端地址并起了一个别名叫origin
$ git remote add origin https://github.com/amenzai/demo-project.git 
# 查看现有的远端列表
$ git remote -v 
# 第一次提交
$ git push -u origin master
# 拉取远程
$ git pull origin master

# 输出简要的变更日志
$ git status -s 
# 对比工作区和版本库（文件在暂存区则与暂存区对比）的变化
$ git diff 
# 比较暂存区和版本库差异
git diff --staged 

# 可以查看提交日志
$ git log 
# 提交日志简短
$ git reflog

# 回归到指定版本
$ git reset --hard xxxxxx 
# 回退到上一个版本
git reset --hard HEAD^
# 强制覆盖远程版本
git push -f

# 不要用 git push --force，而要用 git push --force-with-lease 代替。在你上次提交之后，只要其他人往该分支提交给代码，git push --force-with-lease 会拒绝覆盖。
git push --force-with-lease

# 查看仓库有哪些分支以及当前处于哪个分支
$ git branch 
# 查看仓库有哪些远程分支
$ git branch --remote 
# 创建一个V2分支
$ git branch V2 
# 切换到V2分支
$ git checkout V2 
# 创建后切换
git checkout -b dev 
# 提交到V2分支
$ git push origin V2 

# 从暂存区恢复到工作文件
git reset <file> 
# 从暂存区恢复到工作文件（所有）
git reset -- . 
# 撤销工作区对应文件修改
git checkout -- readme.txt 
# 抛弃工作区修改
git checkout .  # 用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

# 创建远程分支
git push origin [local_branch]:[remote_branch]
# 在本地创建和远程分支对应的分支
git checkout -b branch-name [remote-branch]
# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch] 
# 建立追踪关系，在现有分支与指定的远程分支之间
git branch --set-upstream branch-name [remote-branch] 

# 合并指定分支到当前分支
git merge dev 
# or
git merge --no-ff -m "merge with no-ff" dev

# 删除分支
git branch -d dev
# 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
git branch -D [branch]
#先删除本地分支(git br -d [branch])，然后再push删除远程分支
git push origin --delete branch_name

#查看分支合并图
git log --graph

# 暂存
git stash 
# 列所有stash
git stash list 
# 恢复暂存的内容
git stash apply 
# 删除暂存区
git stash drop 

# 生成一个可供发布的压缩包
$ git archive 
```

## Node NPM常用命令

```bash
# 安装最新版本
nvm install node 

# 使用哪个版本
nvm use x.x.x 32or64 

# 安装
nvm install x.x.x  

# 卸载
nvm uninstall x.x.x

# 查看本地已经安装版本
nvm list 

# 查看服务器上所有可供安装的版本
nvm ls-remote 

# 列出prefix配置
npm config ls 

# 设置全局缓存文件夹
npm config set cache "C:\dev\nvm\npm-cache"

# 设置全局模块文件夹
npm config set prefix "C:\dev\nvm\npm" 

# 初始化操作，给项目添加一个配置文件(package.json)
npm init 

# 安装package.json中的包以及依赖包
npm install 

# 安装一个包，默认安装最新稳定版本
npm install xxx@0.1.1 

# 安装包到全局
npm install -g xxx 

# 保存在package.json中的普通依赖节点
npm install xxx --save 

# 保存在package.json中的开发依赖节点
npm install xxx --save-dev 

# 列举本地包
npm list 

#列举全局包
npm list -global 

npm config set registry https://registry.npm.taobao.org/
npm config get registry

# 更新
$ npm update -g [package]

# 卸载
$ npm uninstall -g [package]

# 进入REPL环境
node 

# 退出REPL环境
.exit 

# 严格模式
node --use_strict 

# 执行脚本字符串
node -e 'console.log("hello,world")' 

# 特殊变量下划线（_）表示上一个命令的返回结果

# 运行脚本文件
node index.js
node path/index.js
node path/index

# 查看帮助
node --help 
```

## 发布npm包
```js

// 在npmjs.com注册用户
npm adduser

// 先登录
$ npm login

// 发布
$ npm publish

// 给发布的包加标签 例如：beta
$ npm publish --tag beta

// 如果你的模块是用ES6写的，那么发布的时候，最好转成ES5。首先，需要安装Babel。
$ npm install --save-dev babel-cli@6 babel-preset-es2015@6

// 然后，在package.json里面写入build脚本。
"scripts": {
  "build": "babel source --presets babel-preset-es2015 --out-dir distribution",
  "prepublish": "npm run build"
}

// 运行上面的脚本，会将source目录里面的ES6源码文件，转为distribution目录里面的ES5源码文件。然后，在项目根目录下面创建两个文件.npmignore和.gitignore，分别写入以下内容。

// .npmignore
source

// .gitignore
node_modules
distribution
```

## yarn

```bash
yarn init

yarn add [package]@[version]

yarn upgrade [package]

yarn remove [package]

yarn add [package]@[version] --dev

yarn add package-1@1.2.3
yarn add package-2@^1.0.0
yarn add package-3@beta 
```

## hexo命令

```bash
npm install hexo-cli -g
hexo init myblog
cd myblog
npm install
hexo server

hexo new [layout] “postName” 
hexo new page “页面名称”

title: postName #文章页面上的显示名称，可以任意修改，不会出现在URL中
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: #文章分类目录，可以为空，注意:后面有个空格
tags: #文章标签，可空，多标签请用格式[tag1,tag2,tag3]，注意:后面有个空格
```

## ionic命令

```bash
npm install -g cordova ionic
ionic start myApp tabs --v2 
cd myApp
ionic serve
ionic info

# 添加项目平台
ionic platform add android

# 打包
ionic build android

# 直接运行在手机
ionic run android

ionic emulate android

http://view.ionic.io
```

## jade常用命令

```bash
# 编译后备压缩
jade index.jade 

# 编译文件为jade.html并且格式化了 放在相同的目录。
jade index.jade -P  

# 实时编译
jade index.jade -P -w 

# 向文档中传递变量 优先级最低。
jade index.jade -P -w --obj '{"course","jade"}' 

# 通过json想文档传递数据
jade index.jade -P -O jade.json 

jade --client --no-debug runtime.jade

html2jade http://twitter.com

html2jade http://twitter.com > twitter.jade

# outputs mywebpage.jade
html2jade mywebpage.html 

# converts all .html files to .jade
html2jade public/*.html  
```

## babel

```bash
# 全局安装
npm install -g babel-cli

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

## ESLint
```bash
npm install eslint babel-eslint --save-dev 

# .eslint
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}

# package.json
{
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```

## good-storage

**使用**
```js
 import storage from 'good-storage'

 // localStorage
 storage.set(key,val) 

 storage.get(key, def)

 // sessionStorage
 storage.session.set(key, val)

 storage.session.get(key, val)
 ```

**api**

```js
set(key, val)

set storage with key and val

get(key, def)

get storage with key, return def if not find

remove(key)

remove storage with key

has(key)

determine storage has the key

clear()

clear all storages

getAll()

get all the storages

forEach(callback)

forEach the storages and call the callback function with each storage
```