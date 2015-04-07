/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('ph:content:main');
let ProductBar = require('./components/ProductBar.react');
let api = require('../../common/api');
let renderComponent = require('../../common/render');
let settings = require('../../common/Settings');
let Detector = require('./util/detector');

/**
 * Constants.
 */

const BAR_DISABLED_KEY = process.env.BAR_DISABLED_KEY;

/**
 * Locals.
 */

let detector = new Detector;
let options = { [BAR_DISABLED_KEY]: false };

settings.get(BAR_DISABLED_KEY, function(disabled) {
  if (disabled) {
    debug('settings: bar disabled');
    return;
  }

  if (!detector.enable(location.search)) {
    debug('page does not need a product bar');
    return;
  }

  renderComponent(<ProductBar />);
  api.getPost(location.href);
});
