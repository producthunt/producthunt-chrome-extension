/**
 * Dependencies.
 */

let React = require('react');

/**
 * Render React `component`.
 *
 * @param {Object} component
 */

function render(component) {
  let containerEl = document.createElement('div');
  document.body.insertBefore(containerEl, document.body.firstChild)
  React.render(component, containerEl);
}

/**
 * Export `render`.
 */

module.exports = render;
