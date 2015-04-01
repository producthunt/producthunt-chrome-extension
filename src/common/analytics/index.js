/**
 * Dependencies.
 */

let debug = require('debug')('ph:analytics');
let NullAnalytics = require('./null-analytics');

/**
 * Constants.
 */

const ANALYTICS_KEY = process.env.ANALYTICS_KEY;

/**
 * Locals.
 */

let enableAnalytics = window.ProductHuntAnalytics && ANALYTICS_KEY;
let ProductHuntAnalytics = enableAnalytics ? window.ProductHuntAnalytics : NullAnalytics;
let analytics = new ProductHuntAnalytics(process.env.ANALYTICS_KEY);

module.exports = {

  /**
   * Track post click.
   *
   * @param {Object} post
   */

  clickPost(post) {
    debug('track click post');
    getAnonymousId(function(id) {
      analytics.track({
        anonymousId: id,
        event: 'click',
        properties: {
          type: 'post',
          link_location: 'index',
          platform: 'chrome extension',
          post_id: post.id,
          post_name: post.name
        }
      });
    });
  },

  /**
   * Track bar click.
   *
   * @param {Object} post
   * @public
   */

  clickBar(post) {
    debug('track click bar');
    getAnonymousId(function(id) {
      analytics.track({
        anonymousId: id,
        event: 'click',
        properties: {
          type: 'post',
          link_location: 'top_bar',
          platform: 'chrome extension',
          post_id: post.id,
          post_name: post.name
        }
      });
    });
  }
};

/**
 * Generate random user id.
 *
 * @returns {String}
 * @private
 */

function anonymousId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
 * Get anonymous ID.
 *
 * @param {Function} fn
 * @private
 */

function getAnonymousId(fn) {
  chrome.storage.sync.get({ userId: null }, function(items) {
    if (items.userId) {
      debug('User ID found in cache');
      return fn(items.userId);
    }

    debug('User ID not found in cache, generating a new one');

    let userId = anonymousId();

    chrome.storage.sync.set({ userId: userId }, function() {
      fn(userId);
    });
  });
}
