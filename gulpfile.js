var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
// var gutil = require('gulp-util');


gulp.task('default', function() {
  return gulp.src('sass/*.scss')
    .pipe(watch('sass/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

// gulp.task('log', function() {
//   gutil.log('Lets get started!')
// });

gulp.task('js', function() {
  gulp.src('scripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});