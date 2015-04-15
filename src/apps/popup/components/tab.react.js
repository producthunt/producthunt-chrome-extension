/**
 * Dependencies.
 */

let React = require('react');
let Frame = require('react-frame-component');
let debug = require('debug')('ph:popup:tab');

/**
 * iframe Tab View.
 *
 * Usage:
 *
 * ```js
 * <Tab url="https://www.producthunt.com/posts/mixpanel" />
 * ```
 *
 * Properties:
 *
 * - url: Post URL
 *
 * @class
 */

let Tab = React.createClass({

  /**
   * Hide the iframe and show the loader.
   */

  componentDidUpdate() {
    this.getDOMNode().querySelector('iframe')
      .style.setProperty('display', 'none');

    this.getDOMNode().querySelector('#loader')
      .style.setProperty('display', 'block');
  },

  /**
   * Bind to iframe's load event so we can hide the
   * laoder and show the iframe.
   */

  componentDidMount() {
    let iframe = this.getDOMNode().querySelector('iframe');
    let loader = this.getDOMNode().querySelector('#loader');

    iframe.style.setProperty('display', 'none');
    loader.style.setProperty('display', 'block');

    iframe.onload = () => {
      debug('tab loaded');
      loader.style.setProperty('display', 'none');
      iframe.style.setProperty('display', 'block');
    };
  },

  /**
   * Render the view.
   */

  render() {
    debug('loading tab with URL %s', this.props.url);

    return (
      <div>
        <div id="loader" className="loader"></div>
        <iframe src={this.props.url} className="tab-pane" />
      </div>
    );
  }
});

/**
 * Export `Tab`.
 */

module.exports = Tab;
