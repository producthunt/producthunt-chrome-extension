/**
 * Dependencies.
 */

let AppDispatcher = require('../dispatcher');
let ProductConstants = require('../constants');

/**
 * Product Actions.
 */

let ProductActions = {

  /**
   * Handle the receive product action.
   *
   * @param {Object} data
   * @public
   */

  receiveProduct(data) {
    this._dispatch(ProductConstants.RECEIVE_PRODUCT, data);
  },

  /**
   * Handle the receive products action.
   *
   * @param {Object} data
   * @public
   */

  receiveProducts(data) {
    this._dispatch(ProductConstants.RECEIVE_PRODUCTS, data);
  },

  /**
   * Dispatch action with `type` and `data`.
   *
   * @param {String} type
   * @param {Mixed} data
   * @private
   */

  _dispatch(type, data) {
    AppDispatcher.dispatch({
      action: { actionType: type, data: data }
    });
  }
};

/**
 * Export `ProductActions`.
 */

module.exports = ProductActions;
