jest.autoMockOff();

describe('Flash', function() {
  let Flash = require('../Flash.react');
  let React = require('react/addons');

  it('renders a flash message', function() {
    let text = 'test flash message';
    expect(<Flash text={text} />).toRender(text);
  });
});
