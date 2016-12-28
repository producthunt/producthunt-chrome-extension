jasmine.getEnv().beforeEach(function() {
  var ReactDOM = require('react-dom');
  var ReactDOMServer = require('react-dom/server');
  let TestUtils = require('react-addons-test-utils');

  this.addMatchers({
    toRender: function(expected) {
      if (TestUtils.isElement(this.actual)) {
        return ReactDOMServer.renderToString(this.actual).match(expected);
      } else {
        return ReactDOM.findDOMNode(this.actual).innerHTML.match(expected);
      }
    }
  });
});
