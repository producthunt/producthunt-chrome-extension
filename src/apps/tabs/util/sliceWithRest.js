
/**
 * Smart slicing:
 *
 * @example
 *
 * sliceWithRest([1, 2], 1)       -> [[1, 2], []]
 * sliceWithRest([1, 2, 3], 1)    -> [[1], [2, 3]]
 * sliceWithRest([1, 2, 3, 4], 1) -> [[1], [2, 3, 4]]
 *
 * @param {Array} items
 * @param {number} limit
 * @returns {[Array, Array]}
 * @public
 */


export default function sliceWithRest(array, limit) {
  if (array.length <= limit + 1) {
    return [array, []];
  }

  return [
    array.slice(0, limit),
    array.slice(limit),
  ];
}
