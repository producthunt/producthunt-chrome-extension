/**
 * Dependencies.
 */

let debug = require('debug')('ph:typekit');

/**
 * Load Typekit.
 *
 * @public
 */

function loadTypekit() {
  try {
    Typekit.load();
    debug('Typekit loaded');
  } catch(e) {
    debug('Typekit could not be loaded');
  }
}

/**
 * Export `loadTypekit`.
 */

module.exports = loadTypekit;
