/**
 * Dependencies.
 */

let debug = require('debug')('ph:api');
let PostActions = require('../actions/PostActions');
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
   * Fetch post by `url`.
   *
   * @param {String} url
   * @public
   */

  getPost(url) {
    debug('getting post with url %s', url);

    ph.searchPosts({ 'search[url]': url }, function(err, posts) {
      if (err) throw err;
      debug('post received');
      PostActions.receivePost(posts[0]);
    });
  },

  /**
   * Fetch all posts for given date.
   *
   * @param {Date} date
   * @param {Function} callback [optional]
   * @public
   */

  getPosts(daysAgo, cb) {
    debug('getting posts from %d days ago', daysAgo);

    ph.getPosts(daysAgo, function(err, posts) {
      if (err) throw err;
      debug('posts received');

      if (daysAgo === 0) {
        debug('caching the posts...');
        cache.set(CACHE_KEY, posts, CACHE_DURARTION);
      }

      PostActions.receivePosts(posts);
      cb();
    });
  },
};

/**
 * Export `api`.
 */

module.exports = api;
