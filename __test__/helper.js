/**
 * Dependencies.
 */

var path = require('path');

/**
 * Project src directory.
 */

var srcDir = path.join(__dirname, '..', 'src');

/**
 * Require wrapper.
 *
 * @param {String} filename
 * @returns {Mixed}
 * @public
 * @global
 */

function load(filename) {
  return require(filePath(filename));
}

/**
 * Return path to `file`.
 *
 * @param {String} path from the src of the project
 * @returns {String}
 * @public
 * @global
 */

function filePath(file) {
  return path.join(srcDir, file);
}

/**
 * Expose `load` globally.
 */

global.load = load;

/**
 * Expose `filePath` globally.
 */

global.filePath = filePath;
