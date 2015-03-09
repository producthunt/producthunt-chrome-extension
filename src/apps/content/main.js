/**
 * Dependencies.
 */

let React = require('react');
let ProductBar = require('./components/product-bar.react');
let api = require('./util/api');
let Detector = require('./util/detecetor');

/**
 * Locals.
 */

let detect = new Detector;

// check if we should show the product bar
// on the current page

if (detector.enable()) {
  let containerEl = document.createElement('div');

  // insert the container
  document.body.insertBefore(containerEl, document.body.firstChild)

  // render the product bar
  React.render(
    <ProductBar />,
    containerEl
  );

  // fetch the product data
  api.getProduct();
}

