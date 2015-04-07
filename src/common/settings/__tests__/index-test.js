jest.autoMockOff();

describe('settings', function() {
  let settings = require('../');

  afterEach(function() {
    chrome.storage.sync.get = function(){};
  });

  it('gets a key from the chrome storage', function() {
    chrome.storage.sync.get = function(items, cb) {
      expect(items).toEqual({ foo: false });
    };

    settings.get('foo');
  });

  it('yields the value returned by the chrome storage', function() {
    chrome.storage.sync.get = function(items, cb) {
      cb({ foo: 'bar' });
    };

    settings.get('foo', function(value) {
      expect(value).toEqual('bar');
    });
  });
});
