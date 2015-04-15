jest.autoMockOff();

jest.mock(filePath('/common/body-modifier/BodyModifier.react'));
jest.mock('../TopElements.react.js');

describe('ProductBar', function() {
  let ProductBar = require('../ProductBar.react');
  let PostStore = load('/common/stores/PostStore');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  it('does not render if there is no post', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    expect(bar.getDOMNode()).toBeNull();
  });

  it('listens for post change events', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    PostStore.setData({ foo: 'bar' });
    PostStore.emitChange();
    expect(bar).toMatchContent('iframe');
  });

  it('can open the post pane', function() {
    let bar = TestUtils.renderIntoDocument(<ProductBar />);
    let post = { discussion_url: 'test' };

    PostStore.setData(post);
    PostStore.emitChange();

    let node = bar.getDOMNode();
    let link = node.querySelector('div.container');

    TestUtils.Simulate.click(link);

    expect(node.innerHTML).toContain(post.discussion_url);
  });
});
