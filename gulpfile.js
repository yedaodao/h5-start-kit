var path = require('path'),
    gulp = require("gulp"),
    gutil = require("gulp-util"),
    less = require('gulp-less'),
    webpack = require("webpack"),
    connect = require('gulp-connect'),
    gulpSequence = require('gulp-sequence'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');


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


gulp.task('webpack', function (cb) {
    webpack(webpackConfig, function (err, stats) {
        if (err) gutil.log(err);
        cb();
    });
});

gulp.task('uglify', ['webpack'], function () {
    gulp.src('./build/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
});

gulp.task('reload', function () {
    return gulp.src('./app/app.html')
        .pipe(connect.reload());
});


gulp.task('dist', gulpSequence('clean', ['minify-css', 'uglify']));

gulp.task('dev', gulpSequence('clean', ['webpack', 'less', 'watch']));

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});


gulp.task('watch', ['connect'], function () {
    gulp.watch(watchJsFiles, ['seq-1']);
    gulp.watch(watchLessFiles, ['seq-2']);
    gulp.watch(watchHtmlFiles, ['reload']);
});

gulp.task('seq-1', function (cb) {
    gulpSequence('webpack', 'reload')(cb);
});
gulp.task('seq-2', function (cb) {
    gulpSequence('less', 'reload')(cb);
});

gulp.task('clean', function () {
    gulp.src('build')
        .pipe(clean({read: false}));
});


gulp.task('less', function () {
    return gulp.src('./app/modules/static/less/h5-start-kit.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('minify-css', ['less'], function () {
    return gulp.src('./build/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build'));
});



