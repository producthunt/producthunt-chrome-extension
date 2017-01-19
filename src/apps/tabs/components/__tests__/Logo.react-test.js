jest.autoMockOff();

describe('Logo', function() {
  let React = require('react');
  let Logo = require('../Logo.react');

  it('renders the Product Hunt header', function() {
    expect(<Logo />).toRender('Product Hunt');
  });
});
