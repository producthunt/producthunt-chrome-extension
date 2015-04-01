/**
 * Dependencies.
 */

let qs = require('query-string');

/**
 * Constants.
 */

const REF = 'producthunt';

/**
 * Product Bar detecetor
 *
 * @class
 */

class Detector {

  /**
   * Return if the bar must be shown.
   *
   * @param {String} serach
   * @returns {Boolean}
   * @public
   */

  enable(search) {
    return qs.parse(search).ref === REF;
  }
}

/**
 * Export `Detector`.
 */

module.exports = Detector;
