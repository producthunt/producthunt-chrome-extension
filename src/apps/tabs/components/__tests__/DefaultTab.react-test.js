jest.autoMockOff();

describe('DefaultTab', function() {
  let DefaultTab = require('../DefaultTab.react');
  let PostStore = load('/common/stores/PostStore');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  let post = {
    id: 1,
    name: 'Name',
    tagline: 'Tagline',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22
  };

  it('listens for post change events', function() {
    let component = TestUtils.renderIntoDocument(<DefaultTab />);
    PostStore.setData([post]);
    PostStore.emitChange();
    expect(component).toMatchContent(post.name);
  });
});
