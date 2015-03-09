/**
 * Dependencies.
 */

let AppDispatcher = require('../dispatcher/app-dispatcher');
let ProductConstants = require('../constants/product-constants');

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

  receiveProduct: function(data) {
    AppDispatcher.dispatch({
      action: {
        actionType: ProductConstants.RECEIVE_DATA,
        data: data
      }
    });
  }
};

/**
 * Export `ProductActions`.
 */

module.exports = ProductActions;
