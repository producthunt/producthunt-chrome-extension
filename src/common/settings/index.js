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
      cb(items[key]);
    });
  },

  set(key, val, cb) {
  }
}

/**
 * Export `settings`.
 */

module.exports = settings;
