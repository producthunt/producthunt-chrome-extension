jest.autoMockOff();

describe('ProductGroup', function() {
  let ProductGroup = require('../product-group.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let product = {
    name: 'Name',
    tagline: 'Tagline',
    day: '2015-01-01',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22
  };

  function html() {
    return TestUtils.renderIntoDocument(
      <ProductGroup products={[product]} />
    ).getDOMNode().innerHTML;
  }

  it('renders the group name', function() {
    expect(html()).toContain('Thursday');
  });

  it('renders the product name', function() {
    expect(html()).toContain(product.name);
  });
});
