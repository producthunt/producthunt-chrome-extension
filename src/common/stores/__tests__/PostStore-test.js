jest.autoMockOff();

describe('PostStore', function() {
  let PostStore = require('../PostStore');

  afterEach(function() {
    PostStore.reset();
  });

  it('sets/returns a post', function() {
    let post = { foo: 'bar' };
    PostStore.setData(post);
    expect(PostStore.getPost()).toEqual(post);
  });

  it('sets/returns an array of posts', function() {
    let post = { foo: 'bar' };
    PostStore.setData([post]);
    expect(PostStore.getPosts()).toEqual([post]);
  });

  it('emits change events', function() {
    var cb = jest.genMockFn();

    PostStore.addChangeListener(cb);
    PostStore.emitChange();
    PostStore.removeChangeListener(cb);

    expect(cb).toBeCalled();
  });
});
