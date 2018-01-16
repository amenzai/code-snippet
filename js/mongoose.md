Mongoose API 简单介绍。

## connect

创建数据库连接。

```js
mongoose.connect(url(s)[, options][, callback])
//url(s):数据库地址,可以是多个,以`,`隔开
//options:可选,配置参数
//callback:可选,回调
mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称')
```

**指定用户连接**

```js
mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
```

**连接多个数据库**

```js
// 设置mongos为true
mongoose.connect('urlA,urlB,...', {
   mongos : true 
})
```

## schema && model

### 定义Schema

```js
//语法
new mongoose.Schema({字段...}, [options])

//实例
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    contents: String,
    author: String,
    category: {
        type: ObjectId,
        ref: 'Category' //关联Category表的_id
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Article', //模型名称,
})
```

**字段类型**

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

schema中不仅仅可以设置字段类型，同时还可以设置默认值（default），关联文档（ref），required等。_一旦设置了字段类型，如果出现错误，比如某字段类型为Boolean，而输入了一个其他类型，mongoose将会抛出类型错误的提示。

**options**

```js
// 常用到的`collection`,其他请参考[文档](http://www.nodeclass.com/api/mongoose.html#index_Mongoose-Schema)
{
    _id : true, //Boolean, 唯一索引, 如果不需要,可以设置为false关闭
    collection : '文档名称', //在MongDB中默认使用Model的名字作为集合的名字，如过需要自定义集合的名字，可以通过设置这个选项
    versionKey : '__v', //包含文档的内部修订,默认的是__v
    autoIndex, 
    capped : Number, //上限设置,此属性对批量操作有效，用来限制一次对数据库操作的量
    id, //mongoose分配给每一个schema一个虚拟属性id，它是一个getter。返回的是_id转换为字符串后的值
    read,
    safe,
    shardKey,
    strict,
    toJSON,
    toObject
}
```

### Model

```js
//语法
mongoose.model(`文档名称`, Schema)
//实例
module.exports = mongoose.model(`Article`, ArticleSchema )
```

**Methods 实例方法**

Model的实例是document。内置实例方法如 save，可以通过methods属性给实例自定义扩展方法

```js
ArticleSchema.methods.methodFunc = function() {
  // body...
}
```

**Statics 静态方法**

model的静态方法很多，如find，update等，可以通过 statics属性给 Model 添加自定义扩展方法

```js
ArticleSchema.statics.staticFunc = function() {
  // body...
}
```

**Methods 和 Statics 的区别**

statics是给model添加方法，methods是给实例（instance）添加方法。

```js
//接上面代码,
//module.exports = mongoose.model(`Article`, ArticleSchema )
//将article的model保存为文件 article.js

const Article = require('../models/article')

// statics
Article.staticFunc ()

//methods
const article = new Article(arguments)
article.methodFunc()
```

#### find

查询多条文档

```js
Model.find(conditions, [fields], [options], [callback])
conditions <Object> //查询条件
[fields] <Object> //要查询的字段
[options] <Object> //查询配置参数
[callback] <Function> //回调
```

条件查询：

- $or　　　　或关系
- $nor　　　　或关系取反
- $gt　　　　大于
- $gte　　　　大于等于
- $lt　　　　小于
- $lte　　　　小于等于
- $ne　　　　不等于
- $in　　　　在多个值范围内
- $nin　　　　不在多个值范围内
- $all　　　　匹配数组中多个值
- $regex　　　　正则，用于模糊查询
- $size　　　　匹配数组大小
- $maxDistance　　　　范围查询，距离（基于LBS）
- $mod　　　　取模运算
- $near　　　　邻域查询，查询附近的位置（基于LBS）
- $exists　　　　字段是否存在
- $elemMatch　　　　匹配内数组内的元素
- $within　　　　范围查询（基于LBS）
- $box　　　　范围查询，矩形范围（基于LBS）
- $center　　　　范围醒询，圆形范围（基于LBS）
- $centerSphere　　　　范围查询，球形范围（基于LBS）
- $slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素

例如查询阅读量大于500小于600的文章

```js
Article.find({views : {$gte : 500 , $lte : 600}})
```


#### findById

findById 用来通过id查询单条文档

```js
Model.findById(id, [fields], [options], [callback])
```

#### findOne

findOne 用来通过条件查询单条文档

```js
Model.findOne(conditions, [fields], [options], [callback])
```

#### populate

populate用于查看关联文档内容, 也就是查询 设置了 ref 的字段关联的 文档的相关字段

```js
Model.populate(docs, options, [cb(err,doc)])

//示例
yield Article.findOne({_id : id}, {title : 1, author : 1})
    .populate('category', {select : {name : 1, _id : 1}})
//查找_id 为 id 的文章的category字段对应的category表中的分类名称和id

//多个关联表需要使用数组

yield Article.findOne({
        _id: id
    }, {
        title: 1,
        author: 1
    })
    .populate([{
        path: 'comments', //文章的comments字段
        select: {
            _id: 1,
            user: 1,
            text: 1,
        },
    }, {
        path: 'category' //文章的category字段,
        select: {
            fields...
        }
    }])
```

分页和排序

```js
yield Article.findOne({
    _id: id
}, {
    title: 1,
    author: 1
}, {
    sort: { 
        createTime: -1, //倒序 desc
        _id: -1
    },
    skip: (page - 1) * pageSize, //page : 当前页码, pageSize 每页显示条数
    limit: pageSize
})
// sort : -1 => desc , a => asc
```

#### count

count方法用来统计符合条件的文档集合的总数

```js
Model.count(conditions, [callback])
```

#### update

```js
Model.update(conditions, update, [options], [callback])

//查找并更新
Model.findByIdAndUpdate(id, [update], [options], [callback])
Model.findOneAndUpdate([conditions], [update], [options], [callback])
```

#### 更新修改器

```js

`$inc` 增减修改器，只对数字有效。
Article.update({_id : id}, {$inc : {views : 1}})
//找到id=_id记录，并且将 views递增，返回后的views为之前的views+1。ps：这个属性很有用，对数字直接进行增减。用于更新一些数字（如阅读数）很有用
`$set` 指定字段的值，这个字段不存在就创建它。可以是任何MondoDB支持的类型。
Article.update({_id : id}, {$set : {views : 51, title : '修改后的标题' ...}})
//更新后views为51,标题为'修改后的标题'
`$unset` 同上取反，删除一个字段
Article.update({views : 50}, {$unset : {views : 'remove'}}) 
//执行后: views字段不存在
可选参数, 第三个参数

{
    new: true, //为true：返回update后的文档，false：返回update前的，默认是false
    sort: null, //排序条件，与sort函数的参数一致。
    fields: null， //要返回的字段, 与find*的第二个参数一致。
    upsert: null, // 如果是true，表示如果没有符合查询选择器的文档，mongo将会综合第一第二个参数向集合插入一个新的文档
    multi: false, //true:更新匹配到的所有文档，false：更新匹配到的第一个文档
}
```
#### save

save是一个实例方法，使用时需要先 new Model() 来获取实例

```js
const article = new Article({
    //字段 => value
    //...
})

yield article.save()
```

#### remove

```js
Model.remove(conditions, [callback])
//查找并删除
Model.findByIdAndRemove(id, [options], [callback])
Model.findOneAndRemove(conditions, [options], [callback])
```