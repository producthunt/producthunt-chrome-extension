'use strict';

/**
 * Dependencies.
 */

var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify');
var source = require('vinyl-source-stream');
var envc = require('envc')();
var gulp = require('gulp');
var gwatch = require('gulp-watch');
var gutil = require('gulp-util')
var html = require('gulp-minify-html');
var json = require('gulp-jsonminify');
var sass = require('gulp-sass');
var ignore = require('gulp-ignore');
var rimraf = require('rimraf');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var bourbon = require('node-bourbon');
var fs = require('fs');
var mocha = require('gulp-spawn-mocha');
var requiredVars = fs.readFileSync('.env.assert', 'utf8').split('\n');
var assertEnv = require('assert-env')(requiredVars.filter(function(key) {
  return !!key;
}));

/**
 * Arguments.
 */

var argv = gutil.env;

/**
 * File patterns.
 */

var patterns = {
  html: 'src/**/*.html',
  img: 'src/img/*.png',
  css: 'src/styles/*.scss',
  json: 'src/**/*.json'
};

/**
 * Root dest.
 */

var dest = 'build' || argv.build;

/**
 * Out destinations.
 */

var dests = {
  img: dest + '/img/',
  css: dest + '/css/',
  js: dest + '/js/'
};

/**
 * JavaScript bundles.
 */

var bundles = [
  { entry: './src/js/popup/app.js', out: 'popup.js' },
  { entry: './src/js/background/app.js', out: 'background.js' }
];

/**
 * Return a gulp-watch or noop, based on
 * the `--watch` flag.
 *
 * @return {Stream}
 * @private
 */

function watch(pattern) {
  return argv.watch ? gwatch(pattern) : gutil.noop();
}

/**
 * Build the JavaScript bundles.
 */

gulp.task('js', function() {
  bundles.forEach(function(bundle) {
    var bundler = browserify({
      entries: [bundle.entry],
      transform: [envify, babelify],
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    var update = function() {
      bundler.bundle()
        .pipe(source(bundle.out))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dests.js));
    };

    if (argv.watch) {
      bundler = watchify(bundler);
      bundler.on('update', update);
    }

    update();
  });
});

/**
 * Minify the HTML files.
 */

gulp.task('html', function() {
  gulp.src(patterns.html)
    .pipe(watch(patterns.html))
    .pipe(html())
    .pipe(gulp.dest(dest));
});

/**
 * Minify the JSON files.
 */

gulp.task('json', function() {
  gulp.src(patterns.json)
    .pipe(watch(patterns.json))
    .pipe(json())
    .pipe(gulp.dest(dest));
});

/**
 * Compile the scss files.
 */

gulp.task('scss', function() {
  gulp.src(patterns.css)
    .pipe(watch(patterns.css))
    .pipe(sass({
      imagePath: '/img',
      includePaths: bourbon.includePaths
    }))
    .pipe(gulp.dest(dests.css));
});

/**
 * Optimize the images.
 */

gulp.task('img', function() {
  gulp.src(patterns.img)
    .pipe(watch(patterns.img))
    .pipe(imagemin())
    .pipe(gulp.dest(dests.img));
});

/**
 * Run the end to end tests.
 */

gulp.task('test-acceptance', ['build'], function () {
  gulp.src(['test/*.test.js'], { read: false })
    .pipe(mocha({ r: 'test/setup.js', timeout: 10000 }));
});

/**
 * Clean the build folder.
 */

gulp.task('clean', function() {
  rimraf.sync(dest)
});

/**
 * Tests.
 */

gulp.task('test', ['test-acceptance']);

/**
 * Build all.
 */

gulp.task('build', ['clean', 'js', 'html', 'json', 'scss', 'img']);
