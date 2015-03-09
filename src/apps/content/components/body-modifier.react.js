/**
 * Dependencies.
 */

let React = require('react');

/**
 * Constants.
 */

const BODY_CLASS = process.env.BODY_CLASS;

/**
 * Locals.
 */

let body = document.body;

/**
 * Modifies the body by adding a class that will
 * push all elements under the `ProductBar`.
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
    body.classList.add(BODY_CLASS);
  },

  /**
   * When we unmount hte component we remove the
   * custom body class.
   */

  componentWillUnmount: function() {
    body.classList.remove(BODY_CLASS);
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
