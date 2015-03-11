jest.autoMockOff();
jest.mock('../header.react.js');

describe('DefaultTab', function() {
  let DefaultTab = require('../default-tab.react');
  let ProductStore = require('../../../../common/stores/product');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  let product = {
    name: 'Name',
    tagline: 'Tagline',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22
  };

  it('listens for product change events', function() {
    let component = TestUtils.renderIntoDocument(<DefaultTab />);
    ProductStore.setData([product]);
    ProductStore.emitChange();
    expect(component.getDOMNode().innerHTML).toContain(product.name);
  });
});
