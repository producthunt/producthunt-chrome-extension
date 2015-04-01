/**
 * Dependencies.
 */

let request = require('superagent');
let cache = require('lscache');
let debug = require('debug')('ph:product-hunt');

/**
 * Constants.
 */

const CACHE_KEY = 'ph.chrome.auth';

/**
 * ProductHunt API client.
 */

class ProductHunt {

  /**
   * Constructor.
   *
   * @param {String} oauth key
   * @param {String} oauth secret
   * @param {String} baseUrl
   */

  constructor(key, secret, baseUrl) {
    this.baseUrl = baseUrl;
    this.key = key;
    this.secret = secret;
    this.cacheKey = CACHE_KEY;
  }

  /**
   * Search products by `query`.
   *
   * @param {Object} query
   * @param {Function} cb
   * @public
   */

  searchProducts(query, cb) {
    debug('searching products...');

    this._getAuth((err, token) => {
      if (err) return cb(err);

      request
        .get(`${this.baseUrl}/v1/posts/all`)
        .query(query)
        .set('Authorization', `Bearer ${token}`)
        .end((res) => {
          let retry = () => this.searchProducts(query, cb)
          this._handleResponse(res, retry, cb);
        });
    });
  }

  /**
   * Get product
   *
   * @param {Number} days ago
   * @param {Function} cb
   * @public
   */

  getProducts(daysAgo, cb) {
    debug('searching products...');

    this._getAuth((err, token) => {
      if (err) return cb(err);

      request
        .get(`${this.baseUrl}/v1/posts`)
        .query({ days_ago: daysAgo })
        .set('Authorization', `Bearer ${token}`)
        .end((res) => {
          let retry = () => this.getProducts(daysAgo, cb)
          this._handleResponse(res, retry, cb);
        });
    });
  }

  /**
   * Return OAuth token either from the cache or the site.
   *
   * @param {Function} cb
   * @private
   */

  _getAuth(cb) {
    let token = cache.get(this.cacheKey);

    // we've got a token in the cache
    if (token) {
      debug('oauth token cache hit');
      return cb(null, token);
    }

    debug('oauth token cache miss');

    let params = {
      client_id: this.key,
      client_secret: this.secret,
      grant_type: 'client_credentials'
    }

    // no cached token, fire up a new request
    request
      .post(`${this.baseUrl}/v1/oauth/token`)
      .send(params)
      .end((res) => {
        debug('oauth token response status: %d', res.status);
        if (res.error) return cb(res.error);
        let expiry = res.body.expires_in / 60;
        cache.set(this.cacheKey, res.body.access_token, expiry);
        cb(null, res.body.access_token);
      });
  }

  /**
   * Remove the auth token from the cache.
   *
   * @private
   */

  _clearAuth() {
    cache.remove(this.cacheKey);
  }

  /**
   * Handle API response.
   *
   * @param {Object} response
   * @param {Function} retry function
   * @param {Fucntion} cb
   * @private
   */

  _handleResponse(res, retryFn, cb) {
    if (res.status === 401) {
      debug('invalid access token, retrying...');
      this._clearAuth();
      retryFn();
    } else if (res.error) {
      debug('response error: %s', res.error);
      cb(res.error);
    } else {
      cb(null, res.body.posts);
    }
  }
}

/**
 * Export `ProductHunt`.
 */

module.exports = ProductHunt;
