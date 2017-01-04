jest.autoMockOff();

describe('Header', function() {
  let React = require('react');
  let Header = require('../Header.react');

  it('renders the Product Hunt header', function() {
    expect(<Header />).toRender('Product Hunt');
  });
});
