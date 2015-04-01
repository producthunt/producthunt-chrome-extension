/**
 * Dependencies.
 */

let assign = require('object-assign');
let debug = require('debug')('ph:stores:product');
let AppDispatcher = require('../dispatcher');
let ProductConstants = require('../constants');
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
 * Product Store.
 */

let ProductStore = assign({}, EventEmitter.prototype, {

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
   * Return the last product.
   *
   * @returns {Object}
   * @public
   */

  getProduct() {
    return data[data.length -1];
  },

  /**
   * Return all products.
   */

  getProducts() {
    return data;
  },

  /**
   * Emit change event.
   *
   * @private
   */

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Set data.
   *
   * @param {Object|Array} product(s)
   * @public
   */

  setData(product) {
    if (Array.isArray(product)) {
      data = data.concat(product);
    } else {
      data.push(product);
    }
  }
});

// Handle actions

AppDispatcher.register(function(payload) {
  let action = payload.action;
  let type = action.actionType;

  if (type === ProductConstants.RECEIVE_PRODUCT || type === ProductConstants.RECEIVE_PRODUCTS) {
    debug('product receive action received');
    ProductStore.setData(action.data);
    ProductStore.emitChange();
  }
});

/**
 * Export `ProductStore`.
 */

module.exports = ProductStore;
