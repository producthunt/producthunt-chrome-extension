/**
 * Group items by `day`.
 *
 * @param {Array} items
 * @returns {Object}
 * @public
 */

function groupByDay(items) {
  let groups = {};

  items.forEach(function(item) {
    groups[item.day] = groups[item.day] || [];
    groups[item.day].push(item);
  });

  return groups;
}

/**
 * Export `groupByDay`.
 */

module.exports = groupByDay;
