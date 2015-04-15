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
 * Export `buildUrl`.
 */

module.exports = buildUrl;
