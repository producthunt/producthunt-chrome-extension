jest.autoMockOff();

import DefaultTab from '../DefaultTab.react';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import buildPost from '../../util/buildPost';

describe('DefaultTab', function() {
  const PostStore = load('/common/stores/PostStore');

  it('listens for post change events', function() {
    let post = buildPost();
    let component = TestUtils.renderIntoDocument(<DefaultTab />);
    PostStore.setData([post]);
    PostStore.emitChange();
    expect(component).toRender(post.name);
  });
});
