/**
 * Modifiers.
 */

require('./x-frame');
require('./typekit');

/**
 * Dependencies.
 */

let analytics = require('../../common/analytics');
let buildUrl = require('./build-url');

/**
 * Constants.
 */

const SEARCH_URL = process.env.POST_SEARCH_URL;

/**
 * Register omnibox "enter" event listner
 */

chrome.omnibox.onInputEntered.addListener(function(query) {
  if (!query) return;

  chrome.tabs.getSelected(null, function(tab) {
    let url = buildUrl(SEARCH_URL, query);
    chrome.tabs.update(tab.id, { url: url });
  });
});

/**
 * Track product bar clicks.
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  analytics.clickBar(request);
});
