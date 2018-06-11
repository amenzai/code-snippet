常用命令汇总

## 开启服务

### http-server
```bash
hs -p 8888 -o
```

### browser-sync
```bash
browser-sync start --server --files "**/*"  #cmd要记得用双引号
```

## Bower常用命令

```bash
$ bower help
$ bower init  # 初始化一个Bower的配置文件(bower.json)
$ bower install  # 安装bower.json里的所有依赖
$ bower install bootstrap#1.4.5  # 安装一个包（指定版本）
$ bower install desandro/masonry  # GitHub shorthand
$ bower install git://github.com/user/package.git  # Git endpoint
$ bower install http://example.com/script.js  # URL
$ bower install bootstrap --save  # 安装一个包并将其添加到配置文件
$ bower uninstall bootstrap # 卸载一个包
$ bower update bootstrap # 更新一个包
$ bower update # 更新所有的包

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
$ git config --global user.name "amenzai" # 提交版本时的用户名
$ git config --global user.email "775166868@qq.com" # 提交版本时的邮箱

$ ssh-keygen -t rsa -C "775166868@qq.com" # 生成Github密匙
$ ssh -T git@github.com # 检查是否添加成功

$ cd demo-project # 定位到仓储文件夹目录
$ git init # 初始化本地仓储

$ echo .DS_Store >> .gitignore # 添加忽略文件

$ git add README.md # 添加指定文件名的文件
$ git add *.md # 添加通配符匹配的文件
$ git add --all # 添加所有未托管的文件（忽略.gitignore清单中的列表）
$ git commit -m 'Initial commit(change log)' # 提交到本地版本库
$ git remote add origin https://github.com/amenzai/demo-project.git # 添加一个远端地址并起了一个别名叫origin
$ git remote -v # 查看现有的远端列表
$ git push -u origin master # 第一次提交
$ git pull origin master

$ git status -s # 输出简要的变更日志
$ git diff # 对比工作区和版本库（文件在暂存区则与暂存区对比）的变化
git diff --staged # 比较暂存区和版本库差异

$ git log # 可以查看提交日志
$ git reflog # 提交日志简短
$ git reset --hard xxxxxx # 回归到指定版本
git reset --hard HEAD^ # 回退到上一个版本
git push -f # 强制覆盖远程版本
$ git branch # 查看仓库有哪些分支以及当前处于哪个分支
$ git branch --remote # 查看仓库有哪些远程分支
$ git branch V2 # 创建一个V2分支
$ git checkout V2 # 切换到V2分支
git checkout -b dev # 创建后切换
$ git push -u origin V2 # 提交到V2分支
git reset <file> # 从暂存区恢复到工作文件
git reset -- . # 从暂存区恢复到工作文件
git checkout -- readme.txt # 撤销工作区对应文件修改
git checkout . # 抛弃工作区修改
# git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

git push origin <local_branch>:<remote_branch> # 创建远程分支
git merge dev # 合并指定分支到当前分支
git merge --no-ff -m "merge with no-ff" dev
git branch -d dev # 删除分支
git branch -D <branch> # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
git push origin --delete branch_name   #先删除本地分支(git br -d <branch>)，然后再push删除远程分支
git log --graph #查看分支合并图
git stash # 暂存
git stash list # 列所有stash
git stash apply # 恢复暂存的内容
git stash drop # 删除暂存区
git checkout -b branch-name [remote-branch] # 在本地创建和远程分支对应的分支
git branch --track [branch] [remote-branch] # 新建一个分支，与指定的远程分支建立追踪关系
git branch --set-upstream branch-name [remote-branch] # 建立追踪关系，在现有分支与指定的远程分支之间

$ git archive # 生成一个可供发布的压缩包
```

## Node NPM常用命令

```bash
nvm install node # 安装最新版本
nvm use vx.x.x 32or64 # 使用哪个版本
nvm install vx.x.x  # 安装
nvm uninstall vx.x.x # 卸载
nvm list # 查看本地已经安装版本
nvm ls-remote # 查看服务器上所有可供安装的版本

npm config ls # 列出prefix配置
npm config set cache "C:\dev\nvm\npm-cache" # 设置全局缓存文件夹
npm config set prefix "C:\dev\nvm\npm" # 设置全局模块文件夹
npm install # 安装package.json中的包以及依赖包
npm init # 初始化操作，给项目添加一个配置文件(package.json)
npm install xxx@0.1.1 # 安装一个包，默认安装最新稳定版本
npm install -g xxx # 安装包到全局
npm install xxx --save # 保存在package.json中的普通依赖节点
npm install xxx --save-dev # 保存在package.json中的开发依赖节点
npm list # 列举本地包
npm list -global #列举全局包
npm config set registry https://registry.npm.taobao.org/
npm config get registry
# 更新
$ npm update -g bower
# 卸载
$ npm uninstall --global bower

node # 进入REPL环境
.exit # 退出REPL环境
node --use_strict # 严格模式
node -e 'console.log("hello,world")' # 执行脚本字符串
# 特殊变量下划线（_）表示上一个命令的返回结果
# 运行脚本文件
node index.js
node path/index.js
node path/index
node --help # 查看帮助
```
```js

// 在npmjs.com注册用户
npm adduser

// 发布
npm publish

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
jade index.jade  # 编译后备压缩
jade index.jade -P  # 编译文件为jade.html并且格式化了 放在相同的目录。
jade index.jade -P -w # 实时编译
jade index.jade -P -w --obj '{"course","jade"}' # 向文档中传递变量 优先级最低。
jade index.jade -P -O jade.json # 通过json想文档传递数据
jade --client --no-debug runtime.jade
html2jade http://twitter.com

html2jade http://twitter.com > twitter.jade
html2jade mywebpage.html # outputs mywebpage.jade
html2jade public/*.html  # converts all .html files to .jade
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
npm install --save-dev eslint babel-eslint

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