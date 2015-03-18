/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('content:main');
let ProductBar = require('./components/product-bar.react');
let api = require('../../common/api');
let Detector = require('./util/detector');
let getHost = require('./util/get-host');

/**
 * Constants.
 */

const PRODUCT_HUNT_HOST = process.env.PRODUCT_HUNT_HOST;

/**
 * Locals.
 */

let referrer = getHost(document.referrer);
let currentHost = location.host;
let detector = new Detector(PRODUCT_HUNT_HOST, currentHost, referrer);

// check if we should show the product bar
// on the current page
if (detector.enable()) {
  debug('showing product bar...');
  let containerEl = document.createElement('div');

  // insert the container
  document.body.insertBefore(containerEl, document.body.firstChild)

  // render the product bar
  React.render(
    <ProductBar />,
    containerEl
  );

  // fetch the product data
  api.getProduct(location.href);
} else {
  debug('not showing product bar...');
}
