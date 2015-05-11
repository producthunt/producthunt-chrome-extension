/**
 * Dependencies.
 */

let React = require('react');
let Flash = require('./Flash.react');
let Header = require('../../../common/header/Header.react');
let settings = require('../../../common/settings');

/**
 * Constants.
 */

const BAR_KEY = process.env.BAR_DISABLED_KEY;
const DEFAULT_TAB_DISABLED = process.env.DISABLE_DEFAULT_TAB;
const EXT_DISABLED_TAB_URL = process.env.EXT_DISABLED_TAB_URL;
const EXT_ENABLED_TAB_URL = process.env.EXT_ENABLED_TAB_URL;

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
 * - `barDisabled`: default value for the bar disabled option
 * - `tabDisabled`: default value for the tab disabled option
 * - `showFlash`:   whether to show the flash message or not
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
    return { barDisabled: false, showFlash: false };
  },

  /**
   * On component mount get the settings from the storage.
   */

  componentDidMount() {
    let options = {};
    options[BAR_KEY] = false;

    settings.getAll(options, (items) => this.setState(items));
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
        <div className="notice">
          {this.renderTabNotice()}
        </div>
        <div>
          <input
            id="bar"
            onChange={this._toggleProductBar}
            checked={this.state[BAR_KEY]}
            type="checkbox" />
            <label htmlFor="bar">Disable product bar</label>
        </div>
      </div>
    );
  },

  /**
   * Render the Default Tab notice.
   */

  renderTabNotice() {
    return DEFAULT_TAB_DISABLED
      ? this.renderDisabledTabNotice()
      : this.renderEnabledTabNotice();
  },

  /**
   * Render the notice about the default tab when enabled.
   */

  renderEnabledTabNotice() {
    return (
      <span>
        Looking to disable the default tab? Check out our <a href={EXT_DISABLED_TAB_URL}>chrome extension without a default tab</a>.
      </span>
    );
  },

  /**
   * Render the notice about the default tab when disabled.
   */

  renderDisabledTabNotice() {
    return (
      <span>
        Looking to enable the default tab? Check out our <a href={EXT_ENABLED_TAB_URL}>chrome extension with a default tab</a>.
      </span>
    );
  },

  /**
   * Toggle the product bar.
   */

  _toggleProductBar() {
    this._toggleOption(BAR_KEY);
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

    settings.setAll(option, () => {
      option.showFlash = true;
      this.setState(option);
    });
  }
});

/**
 * Export `Options`.
 */

module.exports = Options;
