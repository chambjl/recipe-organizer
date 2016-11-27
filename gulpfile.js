var babelify = require("babelify");
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var merge = require('utils-merge');
var watchify = require('watchify');

gulp.task('default', function () {
  var bundler = browserify('app/index.js')
                          .transform(babelify, {presets: ["es2015", "react"]})
    bundle_js(bundler);
});

function bundle_js(bundler){
  bundler.bundle()
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('server/static/tmp'));
};

gulp.task('watchify', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('app/index.js', args))
                        .transform(babelify, {presets: ["es2015", "react"]})
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})
