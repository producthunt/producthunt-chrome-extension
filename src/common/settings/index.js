/**
 * Dependencies.
 */

let assign = require('object-assign');
let debug = require('debug')('ph:settings');

/**
 * Chrome Extension Settings.
 */

let settings = {

  /**
   * Get `key`.
   *
   * @param {String} key
   * @param {Function} callback
   * @public
   */

  get(key, cb) {
    chrome.storage.sync.get({ [key]: false }, function(items) {
      debug('%j', items);
      cb(items[key]);
    });
  }
}

/**
 * Export `settings`.
 */

module.exports = settings;
