/**
 * Dependencies.
 */

let React = require('react');
let Popup = require('./components/popup.react');

/**
 * Render the page.
 *
 * @private
 */

function render() {
  let containerEl = document.createElement('div');
  document.body.insertBefore(containerEl, document.body.firstChild)
  React.render(<Popup />, containerEl);
}

// Do not render immediately, because Chrome
// will wait for the entire page to load (incl. the iframe) in order
// to show the popup.
setTimeout(render, 0);
