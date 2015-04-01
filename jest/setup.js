jasmine.getEnv().beforeEach(function() {
  var React = require('react/addons');

  // add custom matchers
  this.addMatchers({
    toMatchContent: function(expected) {
      return this.actual.getDOMNode().innerHTML.match(expected);
    },

    toRender: function(expected) {
      var div = document.createElement('div');
      var component = React.render(this.actual, div);;
      return component.getDOMNode().innerHTML.match(expected);
    }
  });
});
