/**
 * Dependencies.
 */

let assign = require('object-assign');
let AppDispatcher = require('../dispatcher/app-dispatcher');
let ProductConstants = require('../constants/product-constants');
let EventEmitter = require('events').EventEmitter;

/**
 * Constants.
 */

const CHANGE_EVENT = 'change';

/**
 * Data.
 */

let data = {};

/**
 * Product Store.
 */

let ProductStore = assign({}, EventEmitter.prototype, {

  /**
   * Register event listener
   *
   * @param {Function} cb
   * @public
   */

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  /**
   * Remove event listener.
   *
   * @param {Function} cb
   * @public
   */

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  /**
   * Return the current product.
   *
   * @returns {Object}
   * @public
   */

  getProduct: function() {
    return data;
  },

  /**
   * Emit change event.
   *
   * @private
   */

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

// Handle actions

AppDispatcher.register(function(payload) {
  let action = payload.action;

  if (action.actionType === ProductConstants.RECEIVE_DATA) {
    data = action.data;
    ProductStore.emitChange();
  }
});

/**
 * Export `ProductStore`.
 */

module.exports = ProductStore;
