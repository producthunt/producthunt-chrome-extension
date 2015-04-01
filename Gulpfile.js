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
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var bourbon = require('node-bourbon');
var neat = require('node-neat');
var fs = require('fs');
var mocha = require('gulp-spawn-mocha');
var jest = require('jest-cli');
var harmonize = require('harmonize')();
var requiredVars = fs.readFileSync('.env.assert', 'utf8').split('\n');
var env = process.env;
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
  img: 'src/**/*.{png,svg,ico}',
  css: 'src/**/*.{scss,css}',
  json: 'src/**/*.json',
  vendor: 'vendor/**/**'
};

/**
 * Root dest.
 */

var dest = 'build' || argv.build;

/**
 * JavaScript bundles.
 */

var bundles = [
  { entry: './src/apps/popup/main.js', out: 'apps/popup/main.js' },
  { entry: './src/apps/background/main.js', out: 'apps/background/main.js' },
  { entry: './src/apps/content/main.js', out: 'apps/content/main.js' },
  { entry: './src/apps/tabs/main.js', out: 'apps/tabs/main.js' },
  { entry: './src/apps/options/main.js', out: 'apps/options/main.js' }
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
        .pipe(gulp.dest(dest));
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
  return gulp.src(patterns.html)
    .pipe(watch(patterns.html))
    .pipe(html())
    .pipe(gulp.dest(dest));
});

/**
 * Copy vendor files.
 */

gulp.task('vendor', function() {
  return gulp.src(patterns.vendor)
    .pipe(watch(patterns.vendor))
    .pipe(gulp.dest(dest + '/vendor'));
});

/**
 * Minify the JSON files.
 */

gulp.task('json', function() {
  return gulp.src(patterns.json)
    .pipe(watch(patterns.json))
    .pipe(json())
    .pipe(gulp.dest(dest));
});

/**
 * Compile the scss files.
 */

gulp.task('scss', function() {
  var paths = neat.includePaths.concat(['./src']);

  return gulp.src(patterns.css)
    .pipe(plumber())
    .pipe(watch(patterns.css))
    .pipe(sass({
      imagePath: 'chrome-extension://' + env.EXTENSION_ID,
      includePaths: paths
    }))
    .pipe(gulp.dest(dest));
});

/**
 * Optimize the images.
 */

gulp.task('img', function() {
  return gulp.src(patterns.img)
    .pipe(watch(patterns.img))
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});

/**
 * Run the end to end tests.
 */

gulp.task('test-acceptance', ['build'], function () {
  return gulp.src(['test/*.test.js'], { read: false })
    .pipe(mocha({ r: 'test/setup.js', timeout: 10000 }));
});

/**
 * Run all unit tests.
 */

gulp.task('test-unit', function(done) {
  var options = {
    config: {
      rootDir: __dirname,
      testPathDirs: [__dirname + '/src'],
      scriptPreprocessor: __dirname + '/node_modules/babel-jest/index.js',
      setupEnvScriptFile: __dirname + '/jest/env.js',
      setupTestFrameworkScriptFile: __dirname + '/jest/setup.js'
    }
  };

  jest.runCLI(options, __dirname, function(success) {
    done();
  });
});

/**
 * Clean the build folder.
 */

gulp.task('clean', function() {
  [
    dest + '/_locales',
    dest + '/apps',
    dest + '/common',
    dest + '/vendor',
    dest + '/manifest.json'
  ].forEach(function(dir) {
    rimraf.sync(dir)
  });
});

/**
 * Tests.
 */

gulp.task('test', ['test-acceptance', 'test-unit']);

/**
 * Build all.
 */

gulp.task('build', ['clean', 'js', 'html', 'json', 'scss', 'img', 'vendor']);
