jest.autoMockOff();

import Post from '../Post.react';
import React from 'react';
import buildPost from '../../util/buildPost';

describe('Post', function() {
  let post = buildPost();

  it('renders the votes count', function() {
    expect(<Post post={post} />).toRender(post.votes_count);
  });

  it('renders the comments count', function() {
    expect(<Post post={post} />).toRender(post.comments_count);
  });

  it('renders the post name', function() {
    expect(<Post post={post} />).toRender(post.name);
  });

  it('renders the post tagline', function() {
    expect(<Post post={post} />).toRender(post.tagline);
  });

  it('renders the screenshot_url', function() {
    expect(<Post post={post} />).toRender(post.screenshot_url['300px']);
  });

  it('renders the discussion_url', function() {
    expect(<Post post={post} />).toRender(post.discussion_url);
  });
});
