/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('ph:body-modifier');

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

  componentWillMount() {
    document.body.classList.add(this.props.className);
    debug('body class added: %s', this.props.className);
  },

  /**
   * When we unmount the component we remove the
   * custom body class.
   */

  componentWillUnmount() {
    document.body.classList.remove(this.props.className);
    debug('body class removed: %s', this.props.className);
  },

  /**
   * This component does not render anything.
   *
   * @returns {Boolean} false
   */

  render() {
    return false;
  }
});

/**
 * Export `BodyModifier`.
 */

module.exports = BodyModifier;
