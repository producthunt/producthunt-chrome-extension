/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('ph:tab:main');
let DefaultTab = require('./components/DefaultTab.react');
let DisabledDefaultTab = require('./components/DisabledDefaultTab.react');
let renderComponent = require('../../common/render');
let loadTypekit = require('../../common/typekit');
let loadGoogleAnalytics = require('../../common/google-analytics');
let settings = require('../../common/settings');

/**
 * Constants.
 */

const TAB_DISABLED_KEY = process.env.TAB_DISABLED_KEY;
const GA_ID = process.env.GA_ID;

// load typekit before everything else
loadTypekit();

settings.get(TAB_DISABLED_KEY, function(disabled) {
  let el = document.getElementById('main');

  if (disabled) {
    debug('settings: tab disabled');
    renderComponent(<DisabledDefaultTab />, el);
  } else {
    loadGoogleAnalytics(GA_ID);
    renderComponent(<DefaultTab />, el);
  }
});
