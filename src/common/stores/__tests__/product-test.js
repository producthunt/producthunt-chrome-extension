jest.autoMockOff();

describe('ProductStore', function() {
  let ProductStore = require('../product');

  it('sets/returns a product', function() {
    let product = { foo: 'bar' };
    ProductStore.setData(product);
    expect(ProductStore.getProduct(product)).toEqual(product);
  });

  it('emits change events', function() {
    var cb = jest.genMockFn();

    ProductStore.addChangeListener(cb);
    ProductStore.emitChange();
    ProductStore.removeChangeListener(cb);

    expect(cb).toBeCalled();
  });
});
