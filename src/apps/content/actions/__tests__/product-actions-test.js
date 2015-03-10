jest.autoMockOff();
jest.mock('../../dispatcher/app-dispatcher');

var AppDispatcher = require('../../dispatcher/app-dispatcher');

describe('ProductActions', function() {
  let ProductActions = require('../product-actions');

  describe('#receiveProduct', function() {
    it('dispatches a new action', function() {
      var data = { foo: 'bar' };
      ProductActions.receiveProduct(data);
      expect(AppDispatcher.dispatch.mock.calls[0][0].action.data).toEqual(data);
    });
  });
});
