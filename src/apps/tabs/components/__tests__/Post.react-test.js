jest.autoMockOff();

describe('Post', function() {
  let Post = require('../Post.react');
  let React = require('react');
  let post = {
    name: 'Name',
    tagline: 'Tagline',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22,
    topics: [],
  };

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
