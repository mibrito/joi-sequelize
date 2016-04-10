
'use strict'; // jshint ignore:line

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');

gulp.task('jshint', () =>
  gulp.src(['index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
);


gulp.task('mocha', () =>
  gulp.src('./test/*.js', {read: false}).pipe(mocha({reporter: 'spec'}))
);
gulp.task('mocha_watch', () =>
  gulp.src('./test/*.js', {read: false})
  .pipe(mocha({reporter: 'spec'}))
  .pipe(watch(['./index.js', './test/*.js']))

);

gulp.task('watch', ['mocha_watch']);
gulp.task('test', ['mocha']);
gulp.task('default', ['jshint']);
