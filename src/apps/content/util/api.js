/**
 * Dependencies.
 */

let debug = require('debug')('content:api');
let ProductActions = require('../actions/product-actions');
let ProductHunt = require('../lib/product-hunt');

/**
 * Constants.
 */

const BASE_URL = process.env.API_BASE_URL;
const OAUTH_KEY = process.env.OAUTH_KEY;
const OAUTH_SECRET = process.env.OAUTH_SECRET;

/**
 * Locals.
 */

let ph = new ProductHunt(OAUTH_KEY, OAUTH_SECRET, BASE_URL);

/**
 * API actions.
 */

let api = {

  /**
   * Fetch product by `url`.
   *
   * @param {String} url
   * @public
   */

  getProduct(url) {
    debug('getting product with url %s', url);

    ph.searchProducts({ 'search[url]': url }, function(err, products) {
      if (err) throw err;
      debug('product: %j', products[0]);
      ProductActions.receiveProduct(products[0]);
    });
  }
};

/**
 * Export `api`.
 */

module.exports = api;
