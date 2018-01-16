mongodb语法简单介绍

## 数据库
```bash
# 查看所有的数据库
show dbs;

# 查看当前窗口所在的数据库
db;

use 数据库名 # 如果数据库不存在，则创建数据库，否则切换到指定数据库。

# 注：show dbs执行结果没有看到test库，但是db查看当前库确是test库，因为test库中刚开始没有任何数据并且是在内存中的，有了数据后就会显示出来了（其他新创建的数据库也是如此）

# 删除当前数据库，默认为 test，故要切换到某个数据库下进行删除
db.dropDatabase();
```
 
## 集合

```bash
# 显式创建集合
db.createCollection("collectionName"); # 创建一个名为collectionName的集合，创建完成后会返回 {"ok",1} json串

#隐式创建集合：
db.collection2.insert({name:"xiaomu",age:20}); 
# 往collection2集合中添加数据来创建集合，如果集合不存在就自动创建集合，返回：WriteResult({"nInserted":1})

# 查看集合
show collections;

# 统计集合collection1中的数据数量
db.collection1.count();

# 删除集合collection1
db.collection1.drop();
#注：mongo中支持js，可通过js操作实现批量处理，如：for(var i=0;i<1000;i++){db.collection2.insert({name:"xiaomu"+i,age:20+i});}
```

## 固定集合

固定集合指的是事先创建而且大小固定的集合。

固定集合特性：固定集合很想环形队列，如果空间不足，最早的文档就会被删除，为新的文档腾出空间。一般来说，固定集合适用于任何想要自动淘汰过期属性的场景，没有太多的操作限制.
```bash
db.createCollection("collectionName",{capped:true,size:10000,max:100}); # size指定集合大小，单位为KB，max指定文档数量
# 当文档数量上限时必须同时指定大小。淘汰机制只有在容量还没满时才会依据数量来工作。要是容量满了则会依据容量来工作。
```
## 查询
 
### 固定条件查询：

*注：mongodb中每条数据都有一个id，用来唯一标识一条数据，id由mongo本身来维护*

```bash
db.collection1.find(); # 查询集合中所有的数据

db.collection1.find({age:7}); # 查询年龄为7的数据

db.collection1.find({age:7},{name:1}); # 查询年龄为7的数据，只返回name字段数据；两个大括号，前面的存查询条件，后面的存返回条件，返回条件字段1表示true，表示此字段返回，如果name后面的1改为0则表示不返回name字段，返回除name字段以外的其他字段

# 注意：如果设置返回字段有为0的已经表示查询所有除了某字段以外的所有字段就不能再设置某个字段为1了，有语法冲突

db.collection1.find({age:7,name:"xiaomu"},{name:1,age:1}); # 查询age为7，name为xiaomu的数据，返回name和age字段

# 注：多条件查询此处是并列，但是如果多个条件都相同的话如{name:"xiaoli",name:"xioamu"}则会只查询后一个条件的数据

db.collection1.find({},{age:1}); # 查询所有的数据，返回age字段

db.collection1.findOne(); # 查询集合的第一条数据
```

### 筛选查询：
- gt(greater than)大于
- lt（less than）小于
- gte(greater then equal)大于等于
- lte(less than equal)小于等于
- ne（not equal）不等于

```bash
db.collection1.find({age:{$gt:10}}); # 查询age大于10的数据
包含

db.collection1.find({price:{$all:[1,2]}}); #（包含。。并且包含。。）此处price是个数组，此方法查询所有price包含1和2的数据

db.collection1.find({price:{$in:[1,2]}}); #（包含。。或者包含。。）查询price中含有1或者2的数据
db.collection1.find({price:{$nin:[1,2]}}); #（不包含。。并且不包含。。）查询price中不含有1并且不含有2的数据

db.collection1.find({$or:[{name:"xiaomu"},{price:{$in:[3]}}]}); #（。。或者。。）查询name为xiaomu或者价格包含3的数据

db.collection1.find({$nor:[{name:"xiaomu"},{name:"xiaoli"}]}); #（既不也不）查询name不为xiaomu或者name不为xiaoli的数据
```

### 分页

```bash
db.collection1.find().skip(0).limit(10); # 查询从0条开始，查询10条，skip()方法默认参数为 0 ，表示跳过的条数
```
### 排序

```bash
db.collection1.find().sort({age:1}); # 按照年龄升序排序，为-1的话表示降序排序
```

### 存在

```bash
db.c2.find({hight:{$exists:1}}); # 查询存在hight字段的数据
```

## 删除
```bash
db.collection1.remove({age:7,name:"xiaomu"}); # 删除age为7，name为xiaomu的数据
```
 
## 更新

```bash
db.c3.update({age:12},{name:"xiaoxiao"}); # 本意为将age为12的数据中的name更新为xiaoxiao，但是实际效果是只是将age为12的满足条件数据的第一条整条数据覆盖为name：“xiaoxiao”

db.c3.update({age:15},{$set:{name:"xiaolili"}}); # 本意为将age为15的数据的name修改为xiaolili，但是实际效果是只修改了查询到的第一条数据

db.c3.update({age:15},{$set:{name:"xiaolili"}},1,1); # 将age为15的数据的name修改为xiaolili
#总共4个参数，第四个参数表示有多条数据符合筛选条件的话是否全部更改，默认为0只改第一条，改为1后表示全部更改。
#第3个参数1表示如果没有符合条件的记录是否新增一条记录，1表示新增，0表示不新增

db.c3.update({age:21},{$set:{name:"xiaolili"}},1,1); # 如果不存在age为21的数据则增加一条，增加的数据为{age:12，name:”xiaolili”}

db.c3.update({age:12},{name:"xiaoxiao"},{$inc:{age:-2}},1,1); # $inc表示使某个键值加减指定的数值，此处表示将name为xiaoxiao的数据的age字段的值减2

db.c3.update({age:12},{name:"xiaoxiao"},{$inc:{age:1}},0,1); # $unset用来删除某个键，此处表示删除name为xiaoxiao的数据的age字段
```

## 索引

mongo默认为每条数据的_id字段建索引

```bash
db.c3.ensureIndex({age:1}); # 为age字段建普通索引
db.c3.dropIndex({age:1}); # 删除age字段的索引
db.c3.ensureIndex({age:1},{unique:true}); # 为age字段建唯一索引，在为字段建了唯一索引后就不能再添加相同值的记录了
```
 
## 数据备份与恢复

备份：mongodump -h dbhost -d dbname -o dbdirectory

```bash
-h：mongodb所在服务器地址，如127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
-d：需要备份的数据库实例，如：test
-o：需要备份的数据存放的位置，例如：d:\data (如果没有则自动创建)
恢复：mongorestore -h dbhost -d dbname -directoryperdb dbdirectory
-h：mongodb所在服务器地址，如127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
-d：需要备份的数据库实例，如：test，此名称也可以和备份的时候不一样
-directoryperdb ：备份数据所在的位置，例如：d:\data
注意：恢复时要在退出mongo命令行状态下执行
```
 
## 导入与导出

导出：mongoexport -d dbname -c collectionName -o output

```bash
-h：数据库地址
-d：指明使用的库
-c：指明要导出的集合
-o：指明要导出的文件路径加文件名，文件名可以是txt、word、excel等多种文件格式
导入：mongoimport -d dbname -c collectionname --file 文件的地址路径
-h：数据库地址
-d：指明使用的库
-c：指明要导出的集合
```
注意：导入时要在退出mongo命令行状态下执行，导入导出与数据备份和恢复相似