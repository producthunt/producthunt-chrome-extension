jest.autoMockOff();

describe('Popup', function() {
  let Popup = require('../Popup.react');
  let React = require('react/addons');

  it('renders a tab', function() {
    expect(<Popup />).toRender('iframe');
  });
});
