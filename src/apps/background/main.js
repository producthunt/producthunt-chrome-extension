// TODO(vesln): Implement suggestions in the future?

require('./x-frame');

/**
 * Constants.
 */

const SEARCH_URL = process.env.SEARCH_URL;

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

// register omnibox "enter" event listner
chrome.omnibox.onInputEntered.addListener(function(query) {
  if (!query) return;

  chrome.tabs.getSelected(null, function(tab) {
    let url = buildUrl(SEARCH_URL, query);
    chrome.tabs.update(tab.id, { url: url });
  });
});
