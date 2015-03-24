/**
 * Locals.
 */

let analytics = new window.ProductHuntAnalytics(process.env.ANALYTICS_KEY);
let userId = anonymousId();

module.exports = {

  /**
   * Track post click.
   *
   * @param {Object} post
   */

  clickPost(post) {
    analytics.track({
      anonymousId: userId,
      event: 'click',
      type: 'post',
      link_location: 'index',
      platform: 'chrome extension',
      post_id: post.id,
      post_name: post.name
    });
  },

  /**
   * Track bar click.
   *
   * @param {Object} post
   * @public
   */

  clickBar(post) {
    analytics.track({
      anonymousId: userId,
      event: 'click',
      type: 'post_bar',
      platform: 'chrome extension',
      post_id: post.id,
      post_name: post.name
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
