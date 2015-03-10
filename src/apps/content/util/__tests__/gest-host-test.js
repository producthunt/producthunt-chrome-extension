jest.autoMockOff();

describe('getHost', function() {
  let getHost = require('../get-host');

  it('returns the host of a url', function() {
    let host = getHost('http://www.producthunt.com/api/v1');
    expect(host).toEqual('www.producthunt.com');
  });
});
