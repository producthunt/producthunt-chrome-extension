/**
 * Dependencies.
 */

let React = require('react');

/**
 * Dependencies.
 */

let DefaultTab = require('./components/default-tab.react');

// render the default tab
let containerEl = document.createElement('div');
document.body.insertBefore(containerEl, document.body.firstChild)

React.render(
  <DefaultTab />,
  containerEl
);
