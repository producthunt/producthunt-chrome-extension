/**
 * Dependencies.
 */

let debug = require('debug')('ph:google-analytics');

/**
 * Load Google Analytics.
 *
 * @param {String} key
 * @public
 */

function loadGa(key) {
  if (!key) {
    debug('no key - bail out');
    return;
  }

  let _gaq = window._gaq = _gaq || [];
  _gaq.push(['_setAccount', key]);
  _gaq.push(['_trackPageview']);

  let ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';

  let s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

  debug('inserted');
}

/**
 * Export `loadGa`.
 */

module.exports = loadGa;
