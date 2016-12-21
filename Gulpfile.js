'use strict';

/**
 * Set the current environment.
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.EXT_ENV = process.env.EXT_ENV || 'development';

/**
 * Dependencies.
 */

var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var envc = require('envc')({ nodeenv: process.env.EXT_ENV || process.env.NODE_ENV });
var envify = require('envify');
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util')
var gwatch = require('gulp-watch');
var html = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var jest = require('jest-cli');
var json = require('gulp-jsonminify');
var minifyCss = require('gulp-minify-css');
var mocha = require('gulp-spawn-mocha');
var neat = require('node-neat');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var zip = require('gulp-zip');

/**
 * Locals.
 */

var requiredVars = fs.readFileSync('.env.assert', 'utf8').split('\n');
var env = process.env;
var EXT_ENV = env.EXT_ENV;
var DEV = env.NODE_ENV === 'development' || env.NODE_ENV === 'test';
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
  locales: 'src/_locales/**/*.json',
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
  { entry: './src/apps/tabs/main.js', out: 'apps/tabs/main.js' },
];

/**
 * Return a gulp-watch or noop, based on
 * the `--watch` flag.
 *
 * @return {Stream}
 * @private
 */

function watch(pattern) {
  return argv.watch ? gwatch(pattern, { verbose: true }) : gutil.noop();
}

/**
 * Build the JavaScript bundles.
 */

gulp.task('js', function() {
  return bundles.map(function(bundle) {
    var bundler = browserify({
      entries: [bundle.entry],
      transform: [envify, babelify],
      debug: DEV,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    bundler.on('log', gutil.log)

    var update = function() {
      return bundler.bundle()
        .on('error', function(err) {
          gutil.log(err.message);
        })
        .pipe(source(bundle.out))
        .pipe(buffer())
        .pipe(gulpif(!DEV, uglify()))
        .pipe(gulp.dest(dest));
    };

    if (argv.watch) {
      bundler = watchify(bundler);
      bundler.on('update', update);
    }

    return update();
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
 * Minify the locale files.
 */

gulp.task('locales', function() {
  return gulp.src(patterns.locales)
    .pipe(watch(patterns.locales))
    .pipe(json())
    .pipe(gulp.dest(dest + '/_locales/'));
});

/**
 * Modify the manifest file.
 */

gulp.task('manifest', function(done) {
  var manifest = require('./src/manifest.json');

  if (EXT_ENV !== 'production') {
    manifest.name = '[' + EXT_ENV + '] ProductHunt';
  }

  if (env.DISABLE_DEFAULT_TAB) {
    manifest.chrome_url_overrides = {};
  }

  fs.writeFile(dest + '/manifest.json', JSON.stringify(manifest), done);
});

/**
 * Compile the scss files.
 */

gulp.task('scss', function() {
  var paths = neat.includePaths.concat(['./src']);

  return gulp.src(patterns.css)
    .pipe(watch(patterns.css))
    .pipe(gulpif(DEV, sourcemaps.init()))
    .pipe(sass({
      imagePath: 'chrome-extension://' + env.EXTENSION_ID,
      includePaths: paths,
      errLogToConsole: true
    }))
    .pipe(gulpif(DEV, sourcemaps.write()))
    .pipe(gulpif(!DEV, minifyCss()))
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

gulp.task('test-acceptance', function() {
  return gulp.src(['test/*.js'], { read: false })
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
 * Create an archive from `build`.
 */

gulp.task('pack', function() {
  var version = require('./src/manifest.json').version;

  return gulp.src(dest + '/**/*')
    .pipe(zip(version + '-product-hunt.zip'))
    .pipe(gulp.dest('dist'));
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

gulp.task('build', [
  'clean',
  'js',
  'html',
  'locales',
  'manifest',
  'scss',
  'img',
  'vendor'
]);
