/**
 * Dependencies.
 */

let React = require('react');
let Frame = require('react-frame-component');
let ProductStore = require('../stores/product-store');
let BodyModifier = require('./body-modifier.react');
let TopElements = require('./top-elements.react');
let ProductDetails = require('./product-details.react');
let Pane = require('./pane.react');
let TweetButton = require('./tweet-button.react');
let LikeButton = require('./like-button.react');

/**
 * Constants.
 */

const PRODUCT_BAR_ID = process.env.PRODUCT_BAR_ID;
const BODY_CLASS = process.env.BODY_CLASS;
const OVERLAY_BODY_CLASS = process.env.OVERLAY_BODY_CLASS;
const FB_APP_ID = process.env.FB_APP_ID;
const TWITTER_VIA = process.env.TWITTER_VIA;
const CSS_URL = chrome.extension.getURL('apps/content/product-bar.css');

/**
 * Product Bar.
 *
 * The main component that will build the actual product bar.
 *
 * Usage:
 *
 * ```js
 * <ProductBar />
 * ```
 *
 * State:
 *
 * - `product`: the product that will be shown
 * - `pane`: whether to show the pane or not
 *
 * @class
 */

let ProductBar = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState: function() {
    return { product: null, pane: false };
  },

  /**
   * On component mount, subscribe to product changes.
   */

  componentDidMount: function() {
    ProductStore.addChangeListener(this._handleChange);
  },

  /**
   * On component unmount, unsubscribe from product changes.
   */

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._handleChange);
  },

  /**
   * Render the view.
   */

  render: function() {
    let product = this.state.product;

    if (!product) {
      return false;
    }

    let url = this.state.pane ? product.discussion_url : null;
    let shareUrl = product.discussion_url;
    let tweetText = `${product.name}: ${product.tagline}`;

    // NOTE(vesln): React has bugs when rendering iframe inside the iframe, thats why
    // the Like and Tweet buttons are wrapped inside divs
    // TODO(vesln): Investigate
    return (
      <div>
        <BodyModifier className={BODY_CLASS} />
        <TopElements />
        <Pane bodyClass={OVERLAY_BODY_CLASS} url={url} onClick={this._togglePane} />

        <Frame className="__phc-bar" id={PRODUCT_BAR_ID} scrolling="no" head={
          <link type='text/css' rel='stylesheet' href={CSS_URL} />
        }>
          <ProductDetails product={this.state.product} onClick={this._togglePane} />

          <div className="facebook">
            <LikeButton url={shareUrl} appId={FB_APP_ID} />
          </div>

          <div className="twitter">
            <TweetButton via={TWITTER_VIA} url={shareUrl} text={tweetText} />
          </div>

          <a className="close" onClick={this._onCloseClick}>x</a>
        </Frame>
      </div>
    );
  },

  /**
   * Handle close events. It will unmount the current
   * component.
   */

  _onCloseClick: function() {
    let node = this.getDOMNode().parentNode;
    React.unmountComponentAtNode(node);
  },

  /**
   * Handle product change event.
   */

  _handleChange: function() {
    this.setState({ product: ProductStore.getProduct() });
  },

  /**
   * Toggle the pane.
   */

  _togglePane: function() {
    this.setState({ pane: !this.state.pane });
  }
});

/**
 * Export `ProductBar`.
 */

module.exports = ProductBar;
