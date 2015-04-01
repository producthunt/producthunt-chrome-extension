/**
 * Dependencies.
 */

let React = require('react');
let Flash = require('./flash.react');
let Header = require('../../../common/header/header.react');

/**
 * Constants.
 */

const BAR_KEY = process.env.BAR_DISABLED_KEY;
const TAB_KEY = process.env.TAB_DISABLED_KEY;

/**
 * Options Component.
 *
 * Renders the chrome extension options page.
 *
 * Usage:
 *
 * ```js
 * <Options />
 * ```
 *
 * State:
 *
 * - barDisabled: default value for the bar disabled option
 * - tabDisabled: default value for the tab disabled option
 * - showFlash:   whether to show the flash message or not
 *
 * @class
 */

let Options = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState() {
    return { barDisabled: false, tabDisabled: false, showFlash: false };
  },

  /**
   * On component mount get the settings from the storage.
   */

  componentDidMount() {
    let options = {};
    options[BAR_KEY] = false;
    options[TAB_KEY] = false;

    chrome.storage.sync.get(options, (items) => this.setState(items));
  },

  /**
   * Render the view.
   */

  render() {
    return (
      <div className="container">
        <Header />
        <Flash show={this.state.showFlash} text="Your settings have been updated!" />
        <h1>Settings</h1>
        <div>
          <input
            id="bar"
            onChange={this._toggleProductBar}
            checked={this.state[BAR_KEY]}
            type="checkbox" />
            <label htmlFor="bar">Disable product bar</label>
        </div>
        <div>
          <input
            id="tab"
            onChange={this._toggleDefaultTab}
            checked={this.state[TAB_KEY]}
            type="checkbox" />
            <label htmlFor="tab">Disable default tab</label>
        </div>
      </div>
    );
  },

  /**
   * Toggle the product bar.
   */

  _toggleProductBar() {
    this._toggleOption(BAR_KEY);
  },

  /**
   * Toggle the default tab.
   */

  _toggleDefaultTab() {
    this._toggleOption(TAB_KEY);
  },

  /**
   * Toggle option with `key`.
   *
   * @param {String} key
   * @private
   */

  _toggleOption(key) {
    let option = {};
    option[key] = !this.state[key];

    chrome.storage.sync.set(option, () => {
      option.showFlash = true;
      this.setState(option);
    });
  }
});

/**
 * Export `Options`.
 */

module.exports = Options;
