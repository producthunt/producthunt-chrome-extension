/**
 * Dependencies.
 */

let React = require('react');

/**
 * Flash Component.
 *
 * Renders a flash message.
 *
 * Usage:
 *
 * ```js
 * <Flash text="Profile updated" show={true} />
 * ```
 *
 * Properties:
 *
 * - text: Flash text
 * - show: Show the flash message
 *
 * @class
 */

let Flash = React.createClass({

  /**
   * Before updating the component, check if we
   * should show or hide it.
   */

  componentWillUpdate(props) {
    var el = this.getDOMNode();

    if (props.show) {
      el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 1000);
    }
  },

  /**
   * Render the view.
   */

  render() {
    return (
      <div className="flash hidden">{this.props.text}</div>
    );
  }
});

/**
 * Export `Flash`.
 */

module.exports = Flash;
