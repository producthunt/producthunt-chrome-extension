jest.autoMockOff();

describe('PostStore', function() {
  let PostStore = require('../PostStore');

  it('sets/returns a post', function() {
    let post = { foo: 'bar' };
    PostStore.setData(post);
    expect(PostStore.getPost(post)).toEqual(post);
  });

  it('emits change events', function() {
    var cb = jest.genMockFn();

    PostStore.addChangeListener(cb);
    PostStore.emitChange();
    PostStore.removeChangeListener(cb);

    expect(cb).toBeCalled();
  });
});
