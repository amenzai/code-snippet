gulp插件推荐-。-

## gulp-csso

```js
var csso = require('gulp-csso');

gulp.src('./css/*.css')
  .pipe(csso())
  .pipe(gulp.dest('./dist/css'))
```

## gulp-html-minify
```js
var htmlminify = require('gulp-html-minify');

gulp.src('index.html')
    .pipe(htmlminify())
    .pipe(gulp.dest('./dist'))
    
```

## gulp-useref
```js
// index.html

<!-- build:css /css/all.css -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->

// gulpfile.js

var useref = require('gulp-useref');

gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'))
    
```
替换之后：
```js
<link rel="stylesheet" href="css/all.css">  // 之前的两个<link>替换成一个了
```

## gulp-rev
给静态资源文件名添加hash值:unicorn.css => unicorn-d41d8cd98f.css
```js
var rev = require('gulp-rev');

gulp.src('./css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
```

## gulp-rev-replace
重写被gulp-rev重命名的文件名。

```js
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');

gulp.src('index.html')
    .pipe(useref())                         // 替换HTML中引用的css和js
    .pipe(rev())                            // 给css,js,html加上hash版本号
    .pipe(revReplace())                     // 把引用的css和js替换成有版本号的名字
    .pipe(gulp.dest('./dist'))
```