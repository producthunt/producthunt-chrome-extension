jest.autoMockOff();

describe('DisabledDefaultTab', function() {
  let DisabledDefaultTab = require('../DisabledDefaultTab.react');
  let React = require('react/addons');

  it('renders default tab in disabled state', function() {
    expect(<DisabledDefaultTab />).toRender('disabled');
  });
});
