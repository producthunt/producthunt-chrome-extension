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
    return (
      <div className="disabled-indicator">
        <img src="assets/kitty.png" alt="Product Hunt" />
      </div>
    );
  }
});

/**
 * Export `DisabledDefaultTab`.
 */

module.exports = DisabledDefaultTab;
