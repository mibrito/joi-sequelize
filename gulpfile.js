
'use strict'; // jshint ignore:line

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  gulp.src(['index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint']);
gulp.task('default', ['jshint']);
