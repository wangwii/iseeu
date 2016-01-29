var path = require('path');
var gulp = require('gulp');
var clean = require('del');
var webpack = require('webpack');
var gulp_webpack = require('webpack-stream');
var web_connect = require('gulp-connect');

var webpack_conf = require('./webpack.config.js');

var dist_path = path.resolve(__dirname + '/_build');
var web_resources_path = dist_path + "/**/*";

gulp.task('clean', function(){
  return clean([
    dist_path + '/*',
    '!' + dist_path + '/.git'
  ]);
});

gulp.task('package', ['clean'], function(){
  return gulp.src('src/entry.js')
    .pipe(gulp_webpack(webpack_conf, webpack))
    .pipe(gulp.dest(dist_path));
});

gulp.task('web_server', function(){
  web_connect.server({
    port: 8000,
    root: dist_path,
    livereload: true
  });
});

gulp.task('reload_web_resources', function(){
  gulp.src(web_resources_path).pipe(web_connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([web_resources_path], ['reload_web_resources']);
});

gulp.task('default', ['package', 'web_server', 'watch']);
