var path = require('path'),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    less = require('gulp-less'),
    webpack = require("webpack"),
    connect = require('gulp-connect'),
    gulpSequence = require('gulp-sequence');


var webpackConfig = require('./webpack.config');

var watchJsFiles = [
        'lib.js',
        'app/**/*.js',
        'app/**/*.json'
    ],
    watchLessFiles = [
        'app/**/*.less'
    ],
    watchHtmlFiles = [
        'app/**/*.html'
    ];


gulp.task('webpack-dev', function (cb) {
    webpack(webpackConfig, function (err, stats) {
        if (err) gutil.log(err);
        cb();
    });
});
gulp.task('reload', function () {
    return gulp.src('./app/app.html')
        .pipe(connect.reload());
});


gulp.task('webpack-dist', function () {

});

gulp.task('dev', ['webpack-dev', 'less-dev', 'watch']);

gulp.task('connect', function () {
    connect.server({
        port: 8088,
        livereload: true
    });
});


gulp.task('watch', ['connect'], function () {
    gulp.watch(watchJsFiles, ['seq-1']);
    gulp.watch(watchLessFiles, ['seq-2']);
    gulp.watch(watchHtmlFiles, ['reload']);
});

gulp.task('seq-1', function (cb) {
    gulpSequence('webpack-dev', 'reload')(cb);
});
gulp.task('seq-2', function (cb) {
    gulpSequence('less-dev', 'reload')(cb);
});


gulp.task('less-dev', function () {
    return gulp.src('./app/modules/static/less/h5-start-kit.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('less-dist', function () {

});


