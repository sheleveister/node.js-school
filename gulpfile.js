'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('server', function () {
  return browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('./source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./source/styles/**/*.scss', ['sass']);
});

gulp.task('html:watch', function () {
  gulp.watch('./*.html', function () {
    return browserSync.reload();
  });
});

gulp.task('script', function () {
  return gulp.src('./source/scripts/*.js')
    .pipe(gulp.dest('./'));
});

gulp.task('script:watch', function () {
  gulp.watch('./source/scripts/*.js', ['script']);
});

gulp.task('default', [
  'sass', 'sass:watch',
  'server',
  'html:watch',
  'script', 'script:watch'
]);
