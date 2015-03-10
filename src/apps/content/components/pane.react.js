/**
 * Dependencies.
 */

let React = require('react');
let BodyModifier = require('./body-modifier.react');

/**
 * Product Pane View.
 *
 * @class
 */

let Pane = React.createClass({

  /**
   * Render the view.
   */

  render: function() {
    if (!this.props.url) {
      return false;
    }

    // TODO(vesln): temp hack, PH api should return https
    this.props.url = this.props.url.replace('http', 'https');

    return (
      <div>
        <BodyModifier className={this.props.bodyClass} />
        <div className="__phc-overlay" onClick={this.props.onClick}></div>
        <iframe src={this.props.url} className="__phc-pane" />
      </div>
    );
  }
});

/**
 * Export `Pane`.
 */

module.exports = Pane;
