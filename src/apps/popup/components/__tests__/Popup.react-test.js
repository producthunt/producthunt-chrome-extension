jest.autoMockOff();

describe('Popup', function() {
  let Popup = require('../Popup.react');
  let React = require('react');

  it('renders a tab', function() {
    expect(<Popup />).toRender('iframe');
  });
});
