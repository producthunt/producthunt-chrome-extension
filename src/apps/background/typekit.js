/**
 * Make Typekit work by providing the correct document referrer.
 */

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var requestHeaders = details.requestHeaders;
    for (var i = 0; i < requestHeaders.length; ++i) {
      if (requestHeaders[i].name.toLowerCase() === 'referer') return;
    }

    requestHeaders.push({ name: 'referer', value: 'https://www.producthunt.com/' });
    return { requestHeaders: requestHeaders };
}, {
  urls: ['*://use.typekit.net/*'],
  types: ['stylesheet']
}, ['requestHeaders','blocking']);
