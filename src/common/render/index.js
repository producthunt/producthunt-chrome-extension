/**
 * Dependencies.
 */

let React = require('react');

/**
 * Render React `component`.
 *
 * @param {Object} component
 * @param {DOMElement} container (optional)
 * @public
 */

function render(component, el) {
  if (!el) {
    el = document.createElement('div');
    document.body.insertBefore(el, document.body.firstChild)
  }

  React.render(component, el);
}

/**
 * Export `render`.
 */

module.exports = render;
