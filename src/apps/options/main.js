/**
 * Dependencies.
 */

let React = require('react');

/**
 * Dependencies.
 */

let Options = require('./components/options.react');

// render the options page
let containerEl = document.createElement('div');
document.body.insertBefore(containerEl, document.body.firstChild)
React.render(<Options />, containerEl);
