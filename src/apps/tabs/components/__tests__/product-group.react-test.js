jest.autoMockOff();

describe('ProductGroup', function() {
  let ProductGroup = require('../product-group.react');
  let React = require('react/addons');
  let product = {
    name: 'Name',
    tagline: 'Tagline',
    day: '2015-01-01',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22
  };

  it('renders the group name', function() {
    expect(<ProductGroup products={[product]} />).toRender('Thursday');
  });

  it('renders the product name', function() {
    expect(<ProductGroup products={[product]} />).toRender(product.name);
  });
});
