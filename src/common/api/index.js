/**
 * Dependencies.
 */

let debug = require('debug')('ph:api');
let ProductActions = require('../actions/product');
let ProductHunt = require('../product-hunt');
let cache = require('lscache');

/**
 * Constants.
 */

const BASE_URL = process.env.API_BASE_URL;
const OAUTH_KEY = process.env.OAUTH_KEY;
const OAUTH_SECRET = process.env.OAUTH_SECRET;
const CACHE_KEY = process.env.PRODUCTS_CACHE_KEY;
const CACHE_DURARTION = 60 * 24;

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
  },

  /**
   * Fetch all products for given date.
   *
   * @param {Date} date
   * @param {Function} callback [optional]
   * @public
   */

  getProducts(daysAgo, cb) {
    debug('getting products from %d days ago', daysAgo);

    ph.getProducts(daysAgo, function(err, products) {
      if (err) throw err;
      debug('products: %j', products);

      if (daysAgo === 0) {
        debug('caching the products...');
        cache.set(CACHE_KEY, products, CACHE_DURARTION);
      }

      ProductActions.receiveProducts(products);
      cb();
    });
  },
};

/**
 * Export `api`.
 */

module.exports = api;
