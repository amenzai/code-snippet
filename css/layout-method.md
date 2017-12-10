一些常用布局的解决方案-。-

## 居中布局
```html
<div class="parent">
  <div class="child">demo</div>
</div>
```
### 水平居中
```css
.parent{
  text-align: center;
}
.child{
  display: inline-block;
}
```

```css
.child{
  display: table;
  margin: 0 auto;
}
```

```css
.parent{
  position: relative;
}
.child{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

```css
.parent{
  display: flex;
  justify-content: center;
}
.child{
  margin: 0 auto;
}
```

### 垂直居中

```css
.parent{
  display: table-cell;
  vertical-align: middle;
}
```

```css
.parent{
  position: relative;
}
.child{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

```css
.parent{
  display: flex;
  align-items: center;
}
```

### 水平垂直居中
```css
.parent{
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.child{
  display: inline-block;
}
```

```css
.parent{
  position: relative;
}
.child{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
```
```css
.parent{
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 多列布局
```html
<div class="parent">
  <div class="left">
    <p>left</p>
  </div>
  <div class="right">
    <p>right</p>
    <p>right</p>
  </div>
</div>
```
```css
.left{
  float: left;
  width: 100px;
}
.right{
  margin-left: 120px;
}
```
```css
.left{
  float: left;
  width: 100px;
  margin-right: 20px;
}
.right{
  overflow: hidden;
}
```
```css
.parent{
  display: table; width: 100%;
  table-layout: fixed;
}
.left,.right{
  display: table-cell;
}
.left{
  width: 100px;
  padding-right: 20px;
}
```
```css
.parent{
  display: flex;
}
.left{
  width: 100px;
  margin-right: 20px;
}
.right{
  flex: 1;
}
```
```html
<div class="parent">
  <div class="column"><p>1</p></div>
  <div class="column"><p>2</p></div>
  <div class="column"><p>3</p></div>
  <div class="column"><p>4</p></div>
</div>
<style type="text/css">
  .parent{
    display: flex;
  }
  .column{
    flex: 1;
  }
  .column+.column{
    margin-left:20px;
  }
</style>
```

## 全屏布局
```html
<div class="parent">
  <div class="top">top</div>
  <div class="left">left</div>
  <div class="right"><div class="inner">right</div>
  </div>
  <div class="bottom">bottom</div>
</div>
<style type="text/css">
  html,body,.parent{margin:0;height:100%;overflow:hidden;}
  body{color:white;}
  .top{
    position:absolute;top:0;left:0;right:0;height:100px;
    background:blue;
  }
  .left{
    position:absolute;left:0;top:100px;bottom:50px;width:200px;
    background:red;
  }
  .right{
    position:absolute;left:200px;top:100px;bottom:50px;right:0;
    background:pink;overflow: auto;
  }
  .right .inner{min-height: 1000px;}
  .bottom{
    position:absolute;left:0;right:0;bottom:0;height:50px;
    background: black;
  }
</style>
```
```css
.parent{display: flex;flex-direction: column;}
.top{height:100px;background: blue;}
.bottom{height:50px;background: black;}
.middle{flex:1;display:flex;}
.left{width:200px;background: red;}
.right{flex: 1;overflow: auto;background:pink;}
.right .inner{min-height: 1000px;}
```
```css
.parent{display:flex;flex-direction:column;}
.top{background:blue;}
.bottom{background:black;}
.middle{flex:1;display:flex;}
.left{background: red;}
.right{flex:1;overflow:auto;background: pink;}
.right .inner{min-height:1000px;}
```

## 瀑布流
```css
/*瀑布流,使用到的需要调整宽度*/

/*父容器*/
ul.waterfall {
  column-width: 300px;
  column-gap: 20px;
  column-count: 2;
  column-rule: 2px dashed gray;
}
h1 {
  text-align: center;
  /* 跨列大标题 */
  -moz-column-span: all;
  -webkit-column-span: all;
  column-span: all;
}
```
## flex
```css
/*弹性伸缩布局*/

/*父容器*/
/*div {
  width: 100%;
  display: flex;
}*/

/*flex-direction: column;*  子元素排列方式/
/*flex-direction: row-reverse;*/
/*row 设置从左到右排列
row-reverse 设置从右到左排列
column 设置从上到下排列
column-reverse 设置从下到上排列*/

/*flex-wrap: wrap;* 自动换行/
nowrap 默认值，都在一行或一列显示
wrap 伸缩项目无法容纳时，自动换行
wrap-reverse 伸缩项目无法容纳时，自动换行，方向和wrap 相反

/*flex-flow: row wrap;* 上两种的结合写法/

子元素的对齐方式
/*justify-content: center;
/*flex-start 伸缩项目以起始点靠齐
flex-end 伸缩项目以结束点靠齐
center 伸缩项目以中心点靠齐
space-between 伸缩项目平局分布
space-around 同上，但两端保留一半的空间*/

/*处理伸缩项目的额外空间*/
/*align-items:  center;
flex-start 伸缩项目以顶部为基准，清理下部额外空间
flex-end 伸缩项目以底部为基准，清理上部额外空间
center 伸缩项目以中部为基准，平均清理上下部额外空间
baseline 伸缩项目以基线为基准，清理额外的空间
stretch 伸缩项目填充整个容器，默认

/*以上都为父容器内容*/

/*同上,值都一样 处理其中一个元素*/
p: nth - child(1) { align - self: center; }

/*子元素*/
/*p:nth-child(1) {
  flex: 1;
  order: 3;
}
p:nth-child(2) {
  flex: 3;
  order: 2;
}
p:nth-child(3) {
  flex: 1;
  order: 1;
}

.opacity-名称自拟{filter:alpha(opacity=100);-moz-opacity:1.0;-khtml-opacity: 1.0;opacity: 1.0;}*/
```
