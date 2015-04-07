jest.autoMockOff();
jest.mock('../../dispatcher');

var AppDispatcher = require('../../dispatcher');

describe('PostActions', function() {
  let PostActions = require('../PostActions');

  describe('#receivePost', function() {
    it('dispatches a new action', function() {
      var data = { foo: 'bar' };
      PostActions.receivePost(data);
      expect(AppDispatcher.dispatch.mock.calls[0][0].action.data).toEqual(data);
    });
  });

  describe('#receivePosts', function() {
    it('dispatches a new action', function() {
      var data = { foo: 'bar' };
      PostActions.receivePosts(data);
      expect(AppDispatcher.dispatch.mock.calls[0][0].action.data).toEqual(data);
    });
  });
});
