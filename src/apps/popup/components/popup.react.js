/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('ph:popup:popup');
let Tab = require('./Tab.react');

/**
 * Constants.
 */

const SEARCH_URL = process.env.SEARCH_URL;

/**
 * Popup Component.
 *
 * Renders the popup.
 *
 * Usage:
 *
 * ```js
 * <Popup />
 * ```
 *
 * State:
 *
 * - url: Popup URL address
 *
 * @class
 */

let Popup = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState() {
    return { url: SEARCH_URL };
  },

  /**
   * Render the view.
   */

  render() {
    return (
      <div>
        <Tab url={this.state.url} />
      </div>
    );
  }
});

/**
 * Export `Popup`.
 */

module.exports = Popup;
