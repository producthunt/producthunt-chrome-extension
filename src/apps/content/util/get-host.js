/**
 * Get host from `url`.
 *
 * @param {String} url
 * @returns {String}
 * @public
 */

function getHost(url) {
  let parser = document.createElement('a');
  parser.href = url;
  return parser.host;
}

/**
 * Export `getHost`.
 */

module.exports = getHost;
