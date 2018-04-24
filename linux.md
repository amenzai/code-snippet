linux使用指南。

## 安装

- 虚拟机 [vmware workstation](http://rj.baidu.com/soft/detail/13808.html?ald)
  - 安装后，需要添加密匙，百度找到对应版本密匙填写即可
- 系统 [CentOS 7.2 x86_64官方正式版系统（64位）](http://www.xitongzhijia.net/linux/201603/69275.html)
- 虚拟机安装系统，很简单，不做描述

这个linux系统包含图形化界面，默认以图形化界面开启，如果想用命令行使用，采用这个命令：

```bash
systemctl set-default multi-user.target
```

补充：

```bash
systemctl get-default	# 获得当前的运行级别
systemctl set-default multi-user.target	# 设置默认的运行级别为mulit-user
systemctl isolate multi-user.target	# 在不重启的情况下，切换到运行级别mulit-user下
systemctl isolate graphical.target	# 在不重启的情况下，切换到图形界面下
# or
init 5 # 切换图形界面
init 3 # 切换命令行界面
# 命令行界面下，运行 startx可切换图形界面
# 图形界面下按 ctrl+shift+1~6 切换到命令行 这时ctrl+shift+1返回图形界面（上次的图形界面，并没有被销毁） init命令会关闭图形界面，所以会造成没保存的文件丢失。
```

## 常用命令
```bash
# login
ssh name@server # 回车会让你输入用户名、密码

#下载包
wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.xz

# 解压
xz -d node-v8.9.3-linux-x64.tar.xz
tar -xzvf node-v8.9.3-linux-x64.tar.gz
tar -xvf node-v8.9.3-linux-x64.tar
# 压缩
tar -zcvf static.tar.gz ./*

tar -cvf jpg.tar *.jpg  # 将目录里所有jpg文件打包成tar.jpg 

tar -czf jpg.tar.gz *.jpg  # 将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz

# 建立软连接
ln -s /node-v8.9.3-linux-x64/bin/node /usr/local/bin/node
ln -s /node-v8.9.3-linux-x64/bin/npm /usr/local/bin/npm

# linux查看详细目录
ls -la

# 不推荐
# sudo apt-get install nodejs
# sudo apt-get install npm

# 创建目录
mkdir content
ls
ll
cd content 
pwd
cd ..
rm -rf content
cp a.js a1.js
mv a1.js src/a1.js
rm a.js

# vi编辑器
vi a.js
i
esc
esc:w 
esc:q
wsc:wq

# 查看文件内容
cat a.js

# 查看前一些
head a.js
head -n 1 a.js
# 查看后面一些
tail a.js
tail -n 2 a.js

# 搜索操作
grep '2' a.js
```

## 项目上线脚本封装
```bash
# deploy test-project 

# get the last version code
cd /root/test-project 
git checkout master
git pull
rm -rf /root/admin-static/src/appconfig.js
cp -r /deplopy/admin-static/doc/appconfig.js /root/admin-static/src/

cnpm install
cnpm run build
cp -rf /data/www/static/admin /data/www/static/admin_bak
rm -rf /data/www/static/admin/*
cp -rf dist/* /data/www/static/admin
```

```bash
nowdate=`date '+%Y%m%d'`
cd /root/admin-static/weifactory-web
#git checkout master
git pull

cnpm install

cnpm run build
#旧项目归档备份
cd /www/www_weifactory_vastsum_net
#压缩旧项目
tar -zcvf static.${nowdate}.bak ./*
#移动旧项目到备份路径
mv static.${nowdate}.bak /root/file/webfile/static_bak

#回到资源路径
cd /root/admin-static/weifactory-web

cp -rf dist/* /www/www_weifactory_vastsum_net
```

## 参考链接
http://www.cnblogs.com/laov/p/3541414.html#Linux
http://www.cnblogs.com/fnlingnzb-learner/p/5831284.html

http://www.cnblogs.com/wisewrong/p/6344390.html

http://www.jb51.net/article/109534.htm