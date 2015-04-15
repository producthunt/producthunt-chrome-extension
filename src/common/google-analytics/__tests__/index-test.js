jest.autoMockOff();

describe('Google Analytics', function() {
  let loadGa = require('../');

  describe('without key', function() {
    it('does not load Google Analytics', function() {
      loadGa();
      expect(document.querySelector('script')).toBeFalsy();
    });
  });

  describe('with key', function() {
    beforeEach(function() {
      document.body.appendChild(document.createElement('script'));
    });

    it('loads Google Analytics', function() {
      loadGa('key');
      expect(document.querySelector('script').src).toEqual('https://ssl.google-analytics.com/ga.js');
    });
  });
});
