/**
 * Build `url` with `attrs`.
 *
 * @param {String} url
 * @param {String} attrs
 * @returns {String}
 * @public
 */

function buildUrl(url, attrs) {
  let qs = Object.keys(attrs).map(function(key) {
    return `${key}=${encodeURIComponent(attrs[key])}`
  }).join('&');

  return `${url}?${qs}`;
}

/**
 * Export `buildUrl`.
 */

module.exports = buildUrl;
