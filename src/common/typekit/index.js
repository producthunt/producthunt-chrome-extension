/**
 * Load Typekit.
 *
 * @public
 */

function loadTypekit() {
  try {
    Typekit.load();
  } catch(e) {
    // noop
  }
}

/**
 * Export `loadTypekit`.
 */

module.exports = loadTypekit;
