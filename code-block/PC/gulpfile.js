const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  dest: 'dist',
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
  port: 1234,
  proxy: '/'
};

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([paths.dest]);
}

function style() {
  return gulp.src(paths.style.src)
    .pipe(plumber()) // 防止报错中断task
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: true //是否去掉不必要的前缀 默认：true 
    }))
    // .pipe(cleanCSS())
    .pipe(gulp.dest(paths.style.dest))
    .pipe(connect.reload())
}

function script() {
  return gulp.src(paths.script.src)
    .pipe(babel({
      presets: ['env']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.script.dest))
    .pipe(connect.reload())
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
}

function lib() {
  return gulp.src(paths.lib.src)
    .pipe(gulp.dest(paths.lib.dest))
    .pipe(connect.reload())
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(connect.reload())
}

function htmlCompile() {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@root'
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload())
}

function serve() {
  connect.server({
    root: host.path,
    port: host.port,
    livereload: true,
    host: '::',
    middleware: function(connect, opt) {
      return [
        proxy('/api', {
          target: host.proxy,
          changeOrigin: true
        })
      ]
    }
  });
}

function watch() {
  gulp.watch(paths.script.src, script);
  gulp.watch(paths.style.src, style);
  gulp.watch(paths.images.src, images);
  gulp.watch([paths.html.src, paths.template.src], htmlCompile);
}

const build = gulp.series(clean, htmlCompile, gulp.parallel(style, script, lib, images));
const dev = gulp.series(clean, htmlCompile, gulp.parallel(style, script, lib, images), gulp.parallel(serve, watch));

gulp.task('dev', dev);
gulp.task('build', build);
