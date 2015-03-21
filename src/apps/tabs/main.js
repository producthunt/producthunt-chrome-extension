/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('tab:main');

/**
 * Dependencies.
 */

let DefaultTab = require('./components/default-tab.react');

/**
 * Constants.
 */

const TAB_DISABLED_KEY = process.env.TAB_DISABLED_KEY;

/**
 * Render the default tab.
 */

function render() {
  let containerEl = document.createElement('div');
  document.body.insertBefore(containerEl, document.body.firstChild)
  React.render(<DefaultTab />, containerEl);
}

let option = {};
option[TAB_DISABLED_KEY] = false;

chrome.storage.sync.get(option, function(items) {
  if (!items[TAB_DISABLED_KEY]) {
    debug('tab enabled');
    render();
  } else {
    debug('tab disabled');
  }
});
