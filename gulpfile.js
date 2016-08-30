'use strict';

// common
const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const runSequence =  require('run-sequence');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// pug
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
// sass
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleancss = require('gulp-cleancss');
const rename = require('gulp-rename');
// js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// img
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const jpegoptim = require('imagemin-jpegoptim');
const spritesmith = require('gulp.spritesmith');
// deploy
const ghPages = require('gulp-gh-pages');

// Paths
var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    sprites: 'src/img/',
    spritesCss: 'src/css/partials/abstracts/',
    deploy: 'build/**/*'
  },
  src: {
    html: './src/html/*.pug',
    js: 'src/js/*.js',
    css: './src/css/*.scss',
    img: ['src/img/**/**.*', '!src/img/sprite-png/*.*'],
    fonts: 'src/fonts/**/*.*',
    sprites: 'src/img/sprite-png/*.png',
  },
  watch: {
    html: 'src/html/**/*.pug',
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.scss',
    img: 'src/img/*.*',
    fonts: 'src/fonts/**/*.*',
    sprites: 'src/img/sprite-png/*.png'
  },
  clean: './build'
};


// Compilation pug
gulp.task('pug', function() {
  return gulp.src(path.src.html)
    .pipe(newer(path.src.html))
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify({
      indent_size: 2
    }))    
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
})

// Compilation sass
gulp.task('sass', function () {
  return gulp.src(path.src.css)
//    .pipe(sourcemaps.init())
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 3 version']}),
      mqpacker
    ]))
    .pipe(cleancss())
//    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

// Compilation js
gulp.task('js', function() {
  return gulp.src(path.src.js)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

// Optimization images
gulp.task('img', function () {
  return gulp.src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(imagemin())
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

// Creation sprites
gulp.task('sprites', function () {
  var spriteData =
    gulp.src(path.src.sprites)
      .pipe(spritesmith({
        imgName: 'png-sprite.png',
        imgPath: '../img/png-sprite.png',
        cssFormat: 'scss_maps',
        algorithm: 'binary-tree',
        cssName: '_png-sprite.scss',
        cssFormat: 'scss',
        cssVarMap: function(sprite) {
          sprite.name = 's-' + sprite.name
        }
      }));
  spriteData.img.pipe(gulp.dest(path.build.sprites));
  spriteData.css.pipe(gulp.dest(path.build.spritesCss));
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

// Clean
gulp.task('clean', function () {
  return del(path.clean);
});

// Overall build
gulp.task('build', function (cb) {
  runSequence('clean', 'sprites', ['pug', 'img', 'sass', 'js', 'fonts'], cb);
});     


//Server config
var config = {
  server: {
    baseDir: "./build"
  },
//  tunnel: true,
  host: 'localhost',
  port: 9000
};
// Browser sync
gulp.task('browserSync', ['build'], function() {
  browserSync(config);
});

// Overall watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch([path.watch.html], function(event, cb) {
    gulp.start('pug');
  });
  gulp.watch([path.watch.css], function(event, cb) {
    gulp.start('sass');
  });
  gulp.watch([path.watch.js], function(event, cb) {
    gulp.start('js');
  });
  gulp.watch([path.watch.img], function(event, cb) {
    gulp.start('img');
  });
  gulp.watch([path.watch.sprites], function(event, cb) {
    gulp.start('sprites');
  });
  gulp.watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts');
  });
});

// Deploy on github.io
gulp.task('deploy', function() {
  return gulp.src(path.build.deploy)
    .pipe(ghPages());
});

// Default task
gulp.task('default', ['watch']);


