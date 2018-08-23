'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var connect = require('gulp-connect-php');
var inlinesource = require('gulp-inline-source');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');

var autoPrefixBrowserList = ['last 2 version', 'safari 8', 'ie 9', 'opera 12.1', 'ios 8', 'android 4'];

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    connect.server({}, function (){
        browserSync({
            proxy: '127.0.0.1:8000/',
            options: {
                reloadDelay: 250
            },
            notify: false
        });
    });
});

// gulp.task('php', function () {
//     return gulp.src('*.php')
//         .pipe(plumber())
//         .pipe(browserSync.reload({stream: true}))
//         .on('error', gutil.log);
// });

gulp.task('inlinesource', function () {
    const options = {
        rootpath: path.resolve('')
    }
    return gulp.src(landingPages)
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('**/*.php').on('change', function () {
        browserSync.reload();
    });
});

gulp.task('default', ['watch', 'sass', 'browserSync']);