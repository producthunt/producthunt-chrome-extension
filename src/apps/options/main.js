/**
 * Dependencies.
 */

let React = require('react');
let renderComponent = require('../../common/render');
let loadTypekit = require('../../common/typekit');

/**
 * Dependencies.
 */

let Options = require('./components/options.react');

// load Typekit
loadTypekit();

// render the component
renderComponent(<Options />);
