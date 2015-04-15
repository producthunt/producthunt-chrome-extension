/**
 * Dependencies.
 */

let React = require('react');
let Frame = require('react-frame-component');
let PostStore = require('../../../common/stores/PostStore');
let BodyModifier = require('../../../common/body-modifier/BodyModifier.react');
let TopElements = require('./TopElements.react');
let PostDetails = require('./PostDetails.react');
let Pane = require('../../../common/product-pane/Pane.react');
let TweetButton = require('./TweetButton.react');
let ShareButton = require('./ShareButton.react');

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
 * Locals.
 */

let closeButton = require('../../../common/close-button');

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
 * - `post`: the post that will be shown
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

  getInitialState() {
    return { post: null, pane: false };
  },

  /**
   * On component mount, subscribe to post changes.
   */

  componentDidMount() {
    PostStore.addChangeListener(this._handleChange);
  },

  /**
   * On component unmount, unsubscribe from post changes.
   */

  componentWillUnmount() {
    PostStore.removeChangeListener(this._handleChange);
  },

  /**
   * Render the view.
   *
   * NOTE(vesln): React has bugs when rendering iframe inside the iframe, thats why
   * the Share and Tweet buttons are wrapped inside divs
   */

  render() {
    if (!this.state.post) {
      return false;
    }

    let post = this.state.post;
    let url = this.state.pane ? post.discussion_url : null;
    let shareUrl = post.discussion_url;
    let tweetText = `${post.name}: ${post.tagline}`;

    return (
      <div>
        <BodyModifier className={BODY_CLASS} />
        <TopElements />

        <Pane bodyClass={OVERLAY_BODY_CLASS} url={url} onClick={this._togglePane} />

        <Frame className="__phc-bar" id={PRODUCT_BAR_ID} scrolling="no" head={
          <link type='text/css' rel='stylesheet' href={CSS_URL} />
        }>
          <div onClick={this._togglePane} className="container">
            <PostDetails post={this.state.post} />

            <div className="facebook">
              <ShareButton url={shareUrl} appId={FB_APP_ID} />
            </div>

            <div className="twitter">
              <TweetButton via={TWITTER_VIA} url={shareUrl} text={tweetText} />
            </div>

            <a className="close" onClick={this._onCloseClick}>{closeButton}</a>
          </div>
        </Frame>
      </div>
    );
  },

  /**
   * Handle close events. It will unmount the current
   * component.
   */

  _onCloseClick() {
    let node = this.getDOMNode().parentNode;
    React.unmountComponentAtNode(node);
  },

  /**
   * Handle post change event.
   */

  _handleChange() {
    this.setState({ post: PostStore.getPost() });
  },

  /**
   * Track bar click & toggle the pane.
   */

  _togglePane() {
    chrome.runtime.sendMessage(this.state.post);
    this.setState({ pane: !this.state.pane });
  }
});

/**
 * Export `ProductBar`.
 */

module.exports = ProductBar;
