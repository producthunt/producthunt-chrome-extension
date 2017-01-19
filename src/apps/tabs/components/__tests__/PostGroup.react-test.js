jest.autoMockOff();

describe('PostGroup', function() {
  let PostGroup = require('../PostGroup.react');
  let React = require('react');
  let post = {
    id: 1,
    name: 'Name',
    tagline: 'Tagline',
    day: '2015-01-01',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22,
    topics: [],
  };

  it('renders the group name', function() {
    expect(<PostGroup posts={[post]} />).toRender('Thursday');
  });

  it('renders the post name', function() {
    expect(<PostGroup posts={[post]} />).toRender(post.name);
  });
});
