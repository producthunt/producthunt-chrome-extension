const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const TestUtils = require('react-addons-test-utils');

jasmine.addMatchers({
  toRender: function() {
    function renderComponent(actual) {
      if (TestUtils.isElement(actual)) {
        return ReactDOMServer.renderToString(actual);
      } else {
        return ReactDOM.findDOMNode(actual).innerHTML;
      }
    }

    return {
      compare: function(actual, expected) {
        const html = renderComponent(actual);
        const pass = !!html.match(expected);

        return {
          pass: pass,
          message: pass ? '' : `Expected ${ html } to match "${ expected }", but it didn't`,
        };
      }
    };
  }
});
