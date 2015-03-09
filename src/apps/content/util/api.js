/**
 * Dependencies.
 */

let request = require('superagent');
let ProductActions = require('../actions/product-actions');

/**
 * Constants.
 */

const BASE_URL = process.env.API_BASE_URL;
const PRODUCTS = require('../data/example.json').posts;

/**
 * API actions.
 */

let api = {

  /**
   * Fetch product by `url`.
   *
   * TODO(vesln): implement for real once we resolve:
   *
   * XMLHttpRequest cannot load https://api.producthunt.com//v1/posts. Request header field Authorization is not
   * allowed by Access-Control-Allow-Headers.
   *
   * @param {String} url
   * @public
   */

  getProduct: function(url) {
    setTimeout(function() {
      ProductActions.receiveProduct(PRODUCTS[0]);
    }, 200);
  }
};

/**
 * Export `api`.
 */

module.exports = api;
