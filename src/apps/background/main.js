require('./x-frame');

/**
 * Dependencies.
 */

let analytis = require('../../common/analytics');

/**
 * Constants.
 */

const SEARCH_URL = process.env.POST_SEARCH_URL;

/**
 * Build search URL.
 *
 * @param {String} base url
 * @param {String} query
 * @returns {String}
 * @private
 */

function buildUrl(baseUrl, query) {
  return baseUrl.replace('{query}', encodeURI(query));
}

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
  analytis.clickBar(request);
});
