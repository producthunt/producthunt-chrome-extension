jest.autoMockOff();

import PostGroup from '../PostGroup.react';
import React from 'react';
import buildPost from '../../util/buildPost';

describe('PostGroup', function() {
  let post = buildPost();

  it('renders the group name', function() {
    expect(<PostGroup posts={[post]} />).toRender('Thursday');
  });

  it('renders the post name', function() {
    expect(<PostGroup posts={[post]} />).toRender(post.name);
  });
});
