/**
 * Dependencies.
 */

let React = require('react');
let BodyModifier = require('../body-modifier/body-modifier.react');

/**
 * Locals.
 */

let closeButton = (
  <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
      <path d="M5,5 L5,-0.99912834 C5,-1.55536914 5.4477153,-2 6,-2 C6.5561352,-2 7,-1.5518945 7,-0.99912834 L7,5 L12.9991283,5 C13.5553691,5 14,5.4477153 14,6 C14,6.5561352 13.5518945,7 12.9991283,7 L7,7 L7,12.9991283 C7,13.5553691 6.5522847,14 6,14 C5.4438648,14 5,13.5518945 5,12.9991283 L5,7 L-0.99912834,7 C-1.55536914,7 -2,6.5522847 -2,6 C-2,5.4438648 -1.5518945,5 -0.99912834,5 L5,5 L5,5 Z" id="Rectangle-402" fill="#534540" transform="translate(6.000000, 6.000000) rotate(45.000000) translate(-6.000000, -6.000000) "></path>
    </g>
  </svg>
);

/**
 * Product Pane View.
 *
 * Opens up the ProductHunt product pane in an iframe on
 * the right side of the screen. Also, adds an overlay and
 * disables scrolling on the body.
 *
 * Usage:
 *
 * ```js
 * <Pane url="https://www.producthunt.com/posts/mixpanel" onClick=fn />
 * ```
 *
 * Properties:
 *
 * - `url`:          Product URL
 * - `onClick`:      Overlay click event
 * - `bodyClass`:    Body class to be added when showing the overlay
 * - `overlayClass`: Overlay class (default: __phc-Overlay)
 * - `closeClass`:   Close button class (default: __phc-close)
 * - `loaderClass`:  Loader class (default: __phc-loader)
 *
 * @class
 */

let Pane = React.createClass({

  /**
   * Subscribe to iframe onload events when we
   * rerender the view.
   *
   * We hide the loading indicator and show
   * the iframe once loaded.
   */

  componentDidUpdate() {
    if (!this.props.url) return;

    let iframe = this.getDOMNode().querySelector('iframe');
    let loader = this.getDOMNode().querySelector('#__phc-loader');

    iframe.onload = () => {
      loader.parentNode.removeChild(loader);
      iframe.style.setProperty('display', 'block');
      iframe.onload = null;
    };
  },

  /**
   * Render the view.
   */

  render() {
    if (!this.props.url) {
      return false;
    }

    let overlayClass = this.props.overlayClass || '__phc-overlay';
    let paneClass = this.props.paneClass || '__phc-pane';
    let closeClass = this.props.closeClass || '__phc-close';
    let loaderClass = this.props.loaderClass || '__phc-loader';

    this.props.url = location.protocol === 'https:'
      ? this.props.url.replace('http', 'https')
      : this.props.url;

    return (
      <div>
        <BodyModifier className={this.props.bodyClass} />
        <div className={overlayClass} onClick={this.props.onClick}></div>
        <a className={closeClass} onClick={this.props.onClick}>
          {closeButton}
        </a>
        <div className={paneClass}>
          <div id="__phc-loader" className={loaderClass}></div>
          <iframe src={this.props.url} />
        </div>
      </div>
    );
  }
});

/**
 * Export `Pane`.
 */

module.exports = Pane;
