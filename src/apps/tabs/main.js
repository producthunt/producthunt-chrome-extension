/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('tab:main');
let analytics = require('../../common/analytics');

/**
 * Dependencies.
 */

let DefaultTab = require('./components/default-tab.react');

/**
 * Constants.
 */

const TAB_DISABLED_KEY = process.env.TAB_DISABLED_KEY;
const GA_ID = process.env.GA_ID;

/**
 * Render the default tab.
 */

function render() {
  let containerEl = document.createElement('div');
  document.body.insertBefore(containerEl, document.body.firstChild)
  React.render(<DefaultTab />, containerEl);
}

/**
 * Load Google Analytics.
 */

function loadGa() {
  var _gaq = window._gaq = _gaq || [];
  _gaq.push(['_setAccount', GA_ID]);
  _gaq.push(['_trackPageview']);

  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
}

let option = {};
option[TAB_DISABLED_KEY] = false;

chrome.storage.sync.get(option, function(items) {
  if (!items[TAB_DISABLED_KEY]) {
    debug('tab enabled');
    loadGa();
    render();
  } else {
    debug('tab disabled');
  }
});
