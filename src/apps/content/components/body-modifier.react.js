/**
 * Dependencies.
 */

let React = require('react');

/**
 * Locals.
 */

let body = document.body;

/**
 * Modifies the body by adding a class. It will remove the class
 * when unmounting it.
 *
 * Usage:
 *
 * ```js
 * <BodyModifier className="class-you-want-to-add" />
 * ```
 *
 * Properties:
 *
 * - `className`: name of the class to be added
 *
 * @class
 */

let BodyModifier = React.createClass({

  /**
   * When we mount the component we add the custom
   * body class.
   *
   * @public
   */

  componentWillMount: function() {
    body.classList.add(this.props.className);
  },

  /**
   * When we unmount the component we remove the
   * custom body class.
   */

  componentWillUnmount: function() {
    body.classList.remove(this.props.className);
  },

  /**
   * This component does not render anything.
   *
   * @returns {Boolean} false
   */

  render: function() {
    return false;
  }
});

/**
 * Export `BodyModifier`.
 */

module.exports = BodyModifier;
