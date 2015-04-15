jest.autoMockOff();

describe('BodyModifier', function() {
  let BodyModifier = require('../BodyModifier.react');
  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let bodyClass = '__phc-body';

  beforeEach(function() {
    document.body.classList = {
      add: jest.genMockFn(),
      remove: jest.genMockFn()
    };
  });

  afterEach(function() {
    document.body.classList = undefined;
  });

  describe('on mount', function() {
    it('adds a class to the body', function() {
      TestUtils.renderIntoDocument(<BodyModifier className={bodyClass} />);
      expect(document.body.classList.add).toBeCalledWith(bodyClass);
    });
  });

  describe('on unmount', function() {
    it('removes the previously set body class', function() {
      let container = document.createElement('div');

      React.render(<BodyModifier className={bodyClass} />, container);
      React.unmountComponentAtNode(container);

      expect(document.body.classList.remove).toBeCalledWith(bodyClass);
    });
  });
});
