/**
 * Dependencies.
 */

let React = require('react');
let ReactDOM = require('react-dom');
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
    ReactDOM.findDOMNode(this).querySelector('iframe').style.setProperty('display', 'none');
    ReactDOM.findDOMNode(this).querySelector('#loader').style.setProperty('display', 'block');
  },

  /**
   * Bind to iframe's load event so we can hide the
   * laoder and show the iframe.
   */

  componentDidMount() {
    let iframe = ReactDOM.findDOMNode(this).querySelector('iframe');
    let loader = ReactDOM.findDOMNode(this).querySelector('#loader');

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
