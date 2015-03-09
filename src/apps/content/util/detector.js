/**
 * Product Bar detecetor
 *
 * @class
 */

class Detector {
  constructor(site, referrer) {
    this.site = site;
    this.referrer = referrer;
  },

  enable() {
    return true;
  }
}

/**
 * Export `Detector`.
 */

module.exports = Detector;
