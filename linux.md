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
# deploy yuntask admin-static 

# get the last version code
cd /root/admin-static
git checkout develop
git pull
rm -rf /root/admin-static/src/appconfig.js
cp -r /deplopy/admin-static/doc/appconfig.js /root/admin-static/src/

cnpm run build
cp -rf /data/www/static/admin /data/www/static/admin_bak
rm -rf /data/www/static/admin/*
cp -rf dist/* /data/www/static/admin/ 
cp -rf /data/www/static/admin/ueditor /data/www/static/



date 显示系统日期 
cal 2007 显示2007年的日历表 

shutdown -h now 关闭系统(1) 
init 0 关闭系统(2) 
telinit 0 关闭系统(3) 
shutdown -h hours:minutes & 按预定时间关闭系统 
shutdown -c 取消按预定时间关闭系统 
shutdown -r now 重启(1) 
reboot 重启(2) 
logout 注销



http://www.cnblogs.com/laov/p/3541414.html#Linux
http://www.cnblogs.com/fnlingnzb-learner/p/5831284.html

http://www.cnblogs.com/wisewrong/p/6344390.html

http://www.jb51.net/article/109534.htm