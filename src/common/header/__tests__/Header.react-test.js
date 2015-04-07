jest.autoMockOff();

describe('Header', function() {
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let Header = require('../Header.react');

  it('renders the Product Hunt header', function() {
    expect(<Header />).toRender('Product Hunt');
  });
});
