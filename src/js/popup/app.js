// Cannot be done as react component, because of:
// https://github.com/facebook/react/issues/1718
//
// TODO(vesln): convert to react component in the future

/**
 * Constants.
 */

const POPUP_URL = process.env.POPUP_URL;

/**
 * Locals.
 */

let doc = document;
let loadingEl = doc.createElement('div');
let mainEl = doc.getElementById('main');

/**
 * Render the page.
 *
 * @private
 */

function render() {
  loadingEl.className = 'loader';
  mainEl.appendChild(loadingEl);
  main.appendChild(createSearchFrame(POPUP_URL));
}

/**
 * Build the search iframe.
 *
 * @returns {HTMLIFrameElement}
 * @private
 */

function createSearchFrame(src) {
  let iframe = doc.createElement('iframe');

  iframe.src = src;
  iframe.className = 'hidden';

  iframe.addEventListener('load', function() {
    mainEl.removeChild(loadingEl);
    loadingEl.className = 'hidden';
    iframe.className = '';
  });

  return iframe;
}

// Do not render immediately, because Chrome
// will wait for the entire page to load (incl. the iframe) in order
// to show the popup.
setTimeout(render, 0);
