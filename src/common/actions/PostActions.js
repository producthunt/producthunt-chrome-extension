/**
 * Dependencies.
 */

let debug = require('debug')('ph:actions:post');
let AppDispatcher = require('../dispatcher');
let PostConstants = require('../constants');

/**
 * Post Actions.
 */

let PostActions = {

  /**
   * Handle the receive post action.
   *
   * @param {Object} data
   * @public
   */

  receivePost(data) {
    this._dispatch(PostConstants.RECEIVE_POST, data);
  },

  /**
   * Handle the receive posts action.
   *
   * @param {Object} data
   * @public
   */

  receivePosts(data) {
    this._dispatch(PostConstants.RECEIVE_POSTS, data);
  },

  /**
   * Dispatch action with `type` and `data`.
   *
   * @param {String} type
   * @param {Mixed} data
   * @private
   */

  _dispatch(type, data) {
    debug('dispatching %s', type);
    AppDispatcher.dispatch({
      action: { actionType: type, data: data }
    });
  }
};

/**
 * Export `PostActions`.
 */

module.exports = PostActions;
