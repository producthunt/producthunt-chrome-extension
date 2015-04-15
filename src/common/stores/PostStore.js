/**
 * Dependencies.
 */

let assign = require('object-assign');
let debug = require('debug')('ph:stores:post');
let AppDispatcher = require('../dispatcher');
let PostConstants = require('../constants');
let EventEmitter = require('events').EventEmitter;

/**
 * Constants.
 */

const CHANGE_EVENT = 'change';

/**
 * Data.
 */

let data = [];

/**
 * Post Store.
 */

let PostStore = assign({}, EventEmitter.prototype, {

  /**
   * Register event listener
   *
   * @param {Function} cb
   * @public
   */

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  /**
   * Remove event listener.
   *
   * @param {Function} cb
   * @public
   */

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  /**
   * Return the last post.
   *
   * @returns {Object}
   * @public
   */

  getPost() {
    return data[data.length -1];
  },

  /**
   * Return all posts.
   */

  getPosts() {
    return data;
  },

  /**
   * Set data.
   *
   * @param {Object|Array} post(s)
   * @public
   */

  setData(post) {
    if (Array.isArray(post)) {
      data = data.concat(post);
    } else {
      data.push(post);
    }
  },

  /**
   * Emit change event.
   *
   * @public
   */

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Reset the store.
   *
   * @public
   */

  reset() {
    data = [];
  }
});

// Handle actions

AppDispatcher.register(function(payload) {
  let action = payload.action;
  let type = action.actionType;

  if (type === PostConstants.RECEIVE_POST || type === PostConstants.RECEIVE_POSTS) {
    debug('post receive action received');
    PostStore.setData(action.data);
    PostStore.emitChange();
  }
});

/**
 * Export `PostStore`.
 */

module.exports = PostStore;
