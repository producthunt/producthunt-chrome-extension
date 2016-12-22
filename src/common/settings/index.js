/**
 * Dependencies.
 */

let debug = require('debug')('ph:settings');
let nullStorage = {
  get: function(keys, cb) {
    cb(keys);
  },
  set: function(items, cb) {
    cb();
  }
};

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
    this.storage().get({ [key]: false }, function(items) {
      debug('%j', items);
      cb(items[key]);
    });
  },

  /**
   * Get all `keys`.
   *
   * @param {Object} keys
   * @param {Function} callback
   * @public
   */

  getAll(keys, cb) {
    this.storage().get(keys, cb);
  },

  /**
   * Set `items`.
   *
   * @param {Object} items
   * @param {Function} callback
   * @public
   */

  setAll(items, cb) {
    this.storage().set(items, cb);
  },

  /**
   * Return the current storage.
   *
   * @returns {Object}
   * @public
   */

  storage() {
    return chrome.storage ? chrome.storage.sync : nullStorage;
  }
};

/**
 * Export `settings`.
 */

module.exports = settings;
