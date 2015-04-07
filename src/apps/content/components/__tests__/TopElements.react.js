jest.autoMockOff();

describe('TopElements', function() {
  let envc = require('envc')();
  let TopElements = require('../TopElements.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  it('renders nothing', function() {
    let el = TestUtils.renderIntoDocument(<TopElements />);
    expect(el.getDOMNode()).toBeNull();
  });

  describe('on mount', function() {
    it('changes the top position of the top elements', function() {
      let el1 = document.createElement('div');
      let el2 = document.createElement('div');
      let bar = document.createElement('div');

      el1.style.position = 'fixed';
      el1.style.top = '0px';

      bar.id = '__phc-bar';
      bar.style.position = 'fixed';
      bar.style.top = '0px';

      document.body.appendChild(el1);
      document.body.appendChild(el2);
      document.body.appendChild(bar);

      let el = TestUtils.renderIntoDocument(<TopElements />);

      expect(el1.style.top).toEqual('50px');
      expect(el2.style.top).toEqual('');
      expect(bar.style.top).toEqual('0px');
    });
  });

  describe('on unmount', function() {
    it('restores the top position of the top elements on unmount', function() {
      let el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.top = '0px';

      document.body.appendChild(el);

      let container = document.createElement('div');
      React.render(<TopElements />, container);
      React.unmountComponentAtNode(container);

      expect(el.style.top).toEqual('0px');
    });
  });
});
