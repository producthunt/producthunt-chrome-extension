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

  function html() {
    let details = TestUtils.renderIntoDocument(
      <ProductDetails product={product} />
    );
    return details.getDOMNode().innerHTML;
  }

  it('renders the votes count', function() {
    expect(html()).toContain(product.votes_count);
  });

  it('renders the comments count', function() {
    expect(html()).toContain(product.comments_count);
  });

  it('renders the product name', function() {
    expect(html()).toContain(product.name);
  });

  it('renders the product tagline', function() {
    expect(html()).toContain(product.tagline);
  });

  it('accepts a custom onclick handler', function() {
    let click = jest.genMockFn();
    let details = TestUtils.renderIntoDocument(
      <ProductDetails product={product} onClick={click} />
    );
    let link = TestUtils.findRenderedDOMComponentWithTag(details, 'a');

    TestUtils.Simulate.click(link);

    expect(click).toBeCalled();
  });
});
