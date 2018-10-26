const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const del = require('del');
const proxy = require('http-proxy-middleware');
const open = require('open');

const paths = {
  dest: 'dist',
  rev: {
    root: 'rev',
    css: 'rev/css',
    js: 'rev/js'
  },
  style: {
    src: 'src/style/**/*.less',
    dest: 'dist/css/'
  },
  script: {
    src: 'src/script/**/*.js',
    dest: 'dist/js/'
  },
  html: {
    src: ['src/**/*.html', '!src/lib/**/*.html'],
    dest: 'dist/'
  },
  lib: {
    src: ['src/lib/**/*'],
    dest: 'dist/lib/'
  },
  images: {
    src: 'src/images/**/*.{png,jpg,gif,ico}',
    dest: 'dist/images/'
  },
  template: {
    src: 'src/template/**/*'
  }
};

const host = {
  path: 'dist/',
  port: 2018,
  proxy: '/' // 要代理到的域名 http://amenzai.me
};

if (process.env.NODE_ENV === "dev") {
  host.proxy = 'http://test.com'
} else if (process.env.NODE_ENV === "prod") {
  host.proxy = 'http://line.com'
}

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([paths.dest, paths.rev.root]);
}

function style() {
  return gulp.src(paths.style.src)
    .pipe($.plumber()) // 防止报错中断task
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 4 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe($.concat('main.css')) //合并css
    .pipe(gulp.dest(paths.style.dest))
    .pipe($.connect.reload())
}

function styleProd() {
  return gulp.src(paths.style.src)
    .pipe($.plumber()) // 防止报错中断task
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 4 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe($.concat('main.css')) //合并css
    .pipe($.cleanCss()) // 压缩
    .pipe($.rev()) //- 文件名加hash值
    .pipe(gulp.dest(paths.style.dest))
    .pipe($.rev.manifest()) //- 生成一个rev-manifest.json
    .pipe(gulp.dest(paths.rev.css)) //- 将 rev-manifest.json 保存到 rev 目录内
}

function script() {
  return gulp.src(paths.script.src)
    .pipe($.babel({
      presets: ['env'] // es6编译
    }))
    .pipe($.concat('main.js')) //合并js
    .pipe(gulp.dest(paths.script.dest))
    .pipe($.connect.reload())
}

function scriptProd() {
  return gulp.src(paths.script.src)
    .pipe($.babel({
      presets: ['env']
    }))
    .pipe($.stripDebug())
    .pipe($.concat('main.js')) //合并css
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(gulp.dest(paths.script.dest))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(paths.rev.js))
}

function lib() {
  return gulp.src(paths.lib.src)
    .pipe(gulp.dest(paths.lib.dest))
    .pipe($.connect.reload())
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe($.connect.reload())
}

function imagesProd() {
  return gulp.src(paths.images.src)
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.images.dest))
    .pipe($.connect.reload())
}

function htmlCompile() {
  return gulp.src(paths.html.src)
    .pipe($.plumber())
    .pipe($.fileInclude({
      prefix: '@',
      basepath: './src/template',
      indent: true
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe($.connect.reload())
}

function htmlCompileProd() {
  const options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };

  return gulp.src(paths.html.src)
    .pipe($.plumber())
    .pipe($.fileInclude({
      prefix: '@',
      basepath: './src/template', // 导入模板文件
      indent: true
    }))
    .pipe($.htmlmin(options))
    .pipe(gulp.dest(paths.dest))
}

function revReplace() {
  return gulp.src(['rev/**/*.json', './dist/**/*.html', '!./dist/lib/**/*.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe($.revCollector()) //- 执行文件内css名的替换
    .pipe(gulp.dest(paths.dest)); //- 替换后的文件输出的目录
}

function config() {
  const pathArr = ['./src/common/utils.js', './src/common/http.js']
  // if (process.env.NODE_ENV === "dev") { //  开发环境
  //   return gulp.src(['./src/common/config.dev.js'].concat(pathArr))
  //     .pipe($.concat('common.js'))
  //     .pipe(gulp.dest('./src/script'))
  // } else if (process.env.NODE_ENV === "prod") { //  发布到预发环境
  //   return gulp.src(['./src/common/config.prod.js'].concat(pathArr))
  //     .pipe($.concat('common.js'))
  //     .pipe(gulp.dest('./src/script'))
  // }
  return gulp.src(['./src/common/config.js'].concat(pathArr))
    .pipe($.concat('common.js'))
    .pipe(gulp.dest('./src/script'))
}

function serve() {
  $.connect.server({
    root: host.path,
    port: host.port,
    livereload: true,
    host: '::',
    middleware: function (connect, opt) {
      return [
        proxy('/api', {
          target: host.proxy,
          changeOrigin: true
        })
      ]
    }
  });

  open('http://localhost:' + host.port);
}

function watch() {
  gulp.watch(paths.script.src, script);
  gulp.watch(paths.style.src, style);
  gulp.watch(paths.images.src, images);
  gulp.watch([paths.html.src, paths.template.src], htmlCompile);
}

const build = gulp.series(clean, config, htmlCompileProd, gulp.parallel(styleProd, scriptProd, lib, imagesProd), revReplace);
const dev = gulp.series(clean, config, htmlCompile, gulp.parallel(style, script, lib, images), gulp.parallel(serve, watch));

gulp.task('dev', dev);
gulp.task('build', build);