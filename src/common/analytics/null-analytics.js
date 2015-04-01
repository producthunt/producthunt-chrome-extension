/**
 * Dependencies.
 */

let debug = require('debug')('ph:analytics:null-analytics');

/**
 * Null Analytics.
 */

class NullAnalytics {

  /**
   * Noop track.
   *
   * @public
   */

  track() {
    debug('track %j', arguments);
  }
}

/**
 * Export `NullAnalytics`.
 */

module.exports = NullAnalytics;
