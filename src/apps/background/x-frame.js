// TODO(vesln): added temp because of the product pane
// credits: https://gist.github.com/dergachev/e216b25d9a144914eae2
chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (var i = 0; i < details.responseHeaders.length; ++i) {
    if (details.responseHeaders[i].name.toLowerCase() == 'x-frame-options') {
      details.responseHeaders.splice(i, 1);
      return { responseHeaders: details.responseHeaders };
    }
  }
}, { urls: ['<all_urls>'] }, ['blocking', 'responseHeaders']);
