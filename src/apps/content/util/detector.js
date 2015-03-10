/**
 * Product Bar detecetor
 *
 * @class
 */

class Detector {

  /**
   * Constructor.
   *
   * @param {String} product hunt host
   * @param {String} current host
   * @param {String} document referrer
   * @param {Boolean} force show the bar
   */

  constructor(host, currentHost, referrer, force) {
    this.host = host;
    this.referrer = referrer;
    this.currentHost = currentHost;
    this.force = force;
  }

  /**
   * Return if the bar must be shown.
   *
   * @returns {Boolean}
   * @public
   */

  enable() {
    // force enable the bar
    if (this.force) return true;

    // no referrer
    if (!this.referrer) return false;

    // producthunt.com
    if (this.host === this.currentHost) return false;

    // different referrer
    if (this.referrer !== this.host) return false;

    // all good
    return true;
  }
}

/**
 * Export `Detector`.
 */

module.exports = Detector;
