/**
 * Group items by `day`.
 *
 * @param {Array} items
 * @returns {Object}
 * @public
 */

function groupByDay(items) {
  return items.reduce(function(groups, item) {
    groups[item.day] = groups[item.day] || [];
    groups[item.day].push(item);
    return groups;
  }, {});
}

/**
 * Export `groupByDay`.
 */

module.exports = groupByDay;
