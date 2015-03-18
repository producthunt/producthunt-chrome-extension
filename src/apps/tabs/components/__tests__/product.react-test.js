jest.autoMockOff();

describe('Product', function() {
  let Product = require('../product.react');
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

  it('renders the votes count', function() {
    expect(<Product product={product} />).toRender(product.votes_count);
  });

  it('renders the comments count', function() {
    expect(<Product product={product} />).toRender(product.comments_count);
  });

  it('renders the product name', function() {
    expect(<Product product={product} />).toRender(product.name);
  });

  it('renders the product tagline', function() {
    expect(<Product product={product} />).toRender(product.tagline);
  });

  it('renders the screenshot_url', function() {
    expect(<Product product={product} />).toRender(product.screenshot_url['300px']);
  });

  it('renders the discussion_url', function() {
    expect(<Product product={product} />).toRender(product.discussion_url);
  });
});
