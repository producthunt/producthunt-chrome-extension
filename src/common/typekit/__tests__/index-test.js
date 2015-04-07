jest.autoMockOff();

describe('Typekit', function() {
  let loadTypekit = require('../');

  beforeEach(function() {
    window.Typekit = { load: jest.genMockFn() };
  });

  afterEach(function() {
    window.Typekit = undefined;
  });

  it('loads typekit', function() {
    loadTypekit();
    expect(window.Typekit.load).toBeCalled();
  });
});
