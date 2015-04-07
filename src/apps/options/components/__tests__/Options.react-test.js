jest.autoMockOff();

describe('Options', function() {
  let envc = require('envc')();
  let Options = require('../Options.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;

  it('renders a flash message', function() {
    expect(<Options />).toRender('Your settings');
  });

  it('renders the header', function() {
    expect(<Options />).toRender('Product Hunt');
  });

  it('renders product bar option', function() {
    expect(<Options />).toRender('Disable product bar');
  });

  it('renders default tab option', function() {
    expect(<Options />).toRender('Disable default tab');
  });

  describe('persisting settings', function() {
    let node = null;

    beforeEach(function() {
      chrome.storage.sync.set = jest.genMockFn();
      node = TestUtils.renderIntoDocument(<Options />).getDOMNode();
    });

    afterEach(function() {
      chrome.storage.sync.set = function(){};
    });

    it('stores the default tab option', function() {
      TestUtils.Simulate.change(node.querySelector('#tab'));
      expect(chrome.storage.sync.set).toBeCalledWith({ tabDisabled: true }, jasmine.any('function'));
    });

    it('stores the product bar option', function() {
      TestUtils.Simulate.change(node.querySelector('#bar'));
      expect(chrome.storage.sync.set).toBeCalledWith({ barDisabled: true }, jasmine.any('function'));
    });
  });
});
