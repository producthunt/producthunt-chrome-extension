/**
 * Get the current day of the week. In case it's
 * today or yesterday it will return that string.
 *
 * @param {Object} moment instance
 * @returns {String}
 * @public
 */

export default function getDay(date) {
  let diff = date.diff(new Date, 'days');

  if (diff === 0) {
    return 'Today';
  } else if (diff === -1) {
    return 'Yesterday';
  } else {
    return date.format('dddd');
  }
}
