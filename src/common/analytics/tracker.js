/**
 * Dependencies.
 */

let debug = require('debug')('ph:analytics:tracker');

/**
 * Tracker.
 *
 * Analytics wrapper.
 */

class Tracker {

  /**
   * Constructor.
   *
   * @param {Object} analytics
   * @param {Object} storage (optional)
   */

  constructor(analytics, storage=chrome.storage.sync) {
    this.analytics = analytics;
    this.storage = storage;
    this.platform = 'chrome extension';
  }

  /**
   * Track post click.
   *
   * @param {Object} post
   */

  clickPost(post) {
    this._trackPostClick(post, 'index');
  }

  /**
   * Track bar click.
   *
   * @param {Object} post
   * @public
   */

  clickBar(post) {
    this._trackPostClick(post, 'top_bar');
  }

  /**
   * Track post click on `location`.
   *
   * @param {Object} post
   * @param {String} location
   * @private
   */

  _trackPostClick(post, location) {
    this._getAnonymousId((userId) => {
      debug('track post click on "%s" for "%s"', location, userId);

      this.analytics.track({
        anonymousId: userId,
        event: 'click',
        properties: {
          type: 'post',
          link_location: location,
          platform: this.platform,
          post_id: post.id,
          post_name: post.name
        }
      });
    });
  }

  /**
   * Generate random user id.
   *
   * @returns {String}
   * @private
   */

  _anonymousId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  /**
   * Get anonymous ID for the current user, either from cache or
   * generate and store a new one.
   *
   * @param {Function} callback
   * @private
   */

  _getAnonymousId(cb) {
    this.storage.get({ userId: null }, (items) => {
      if (items.userId) {
        debug('User ID found in cache');
        return cb(items.userId);
      } else {
        debug('User ID not found in cache, generating a new one');
      }

      let userId = this._anonymousId();

      this.storage.set({ userId: userId }, function() {
        cb(userId);
      });
    });
  }
}

/**
 * Export `Tracker`.
 */

module.exports = Tracker;
