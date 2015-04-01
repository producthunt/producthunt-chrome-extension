jest.autoMockOff();

describe('ProductDetails', function() {
  let ProductDetails = require('../product-details.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let product = {
    name: 'Name',
    tagline: 'Tagline',
    votes_count: 32,
    comments_count: 22
  };

  it('renders the votes count', function() {
    expect(<ProductDetails product={product} />).toRender(product.votes_count);
  });

  it('renders the comments count', function() {
    expect(<ProductDetails product={product} />).toRender(product.comments_count);
  });

  it('renders the product name', function() {
    expect(<ProductDetails product={product} />).toRender(product.name);
  });

  it('renders the product tagline', function() {
    expect(<ProductDetails product={product} />).toRender(product.tagline);
  });
});
