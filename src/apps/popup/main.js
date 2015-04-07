/**
 * Dependencies.
 */

let React = require('react');
let renderComponent = require('../../common/render');
let Popup = require('./components/Popup.react');

// Do not render immediately, because Chrome
// will wait for the entire page to load (incl. the iframe) in order
// to show the popup.
setTimeout(function() {
  renderComponent(<Popup />);
}, 0);
