jest.autoMockOff();

describe('Tab', function() {
  let Tab = require('../Tab.react');
  let React = require('react');
  let url = 'http://example.com';

  it('renders the given page', function() {
    expect(<Tab url={url} />).toRender(`iframe src="${url}"`);
  });

  it('renders a loader', function() {
    expect(<Tab url={url} />).toRender('<div id="loader"');
  });
});
