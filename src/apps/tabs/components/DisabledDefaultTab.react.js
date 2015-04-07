/**
 * Dependencies.
 */

let React = require('react');

/**
 * Disabled Default Tab Component.
 *
 * Renders the Default Tab in "disabled" state.
 *
 * Usage:
 *
 * ```js
 * <DisabledDefaultTab />
 * ```
 *
 * @class
 */

let DisabledDefaultTab = React.createClass({

  /**
   * Render the view.
   */

  render() {
    return <h4>Product Hunt Default Tab has been disabled</h4>;
  }
});

/**
 * Export `DisabledDefaultTab`.
 */

module.exports = DisabledDefaultTab;
