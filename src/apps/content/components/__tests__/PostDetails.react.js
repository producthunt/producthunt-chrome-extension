jest.autoMockOff();

describe('PostDetails', function() {
  let PostDetails = require('../PostDetails.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let post = {
    name: 'Name',
    tagline: 'Tagline',
    votes_count: 32,
    comments_count: 22
  };

  it('renders the votes count', function() {
    expect(<PostDetails post={post} />).toRender(post.votes_count);
  });

  it('renders the comments count', function() {
    expect(<PostDetails post={post} />).toRender(post.comments_count);
  });

  it('renders the post name', function() {
    expect(<PostDetails post={post} />).toRender(post.name);
  });

  it('renders the post tagline', function() {
    expect(<PostDetails post={post} />).toRender(post.tagline);
  });
});
