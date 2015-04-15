/**
 * Dependencies.
 */

let React = require('react');
let buildUrl = require('../util/buildUrl');

/**
 * Constants.
 */

const TWITTER_BASE = 'https://platform.twitter.com/widgets/tweet_button.html';

/**
 * Tweet Button Component.
 *
 * Renders Twitter tweet button inside an iframe.
 *
 * Usage:
 *
 * ```js
 * <TweetButton via="handle" url="https://www.producthunt.com" text="Check this out!" />
 * ```
 *
 * Properties:
 *
 * - `via`:  via handle
 * - `url`:  url to be shared
 * - `text`: text for the tweet
 *
 * @class
 */

let TweetButton = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let attrs = {
      via: this.props.via,
      url: this.props.url,
      text: this.props.text,
      count: 'none'
    };

    let src = buildUrl(TWITTER_BASE, attrs);

    return (
      <iframe
        className="tweet"
        id="tweet-button"
        allowTransparency="true"
        frameBorder="0"
        scrolling="no" src={src}></iframe>
    );
  }
});

/**
 * Export `TweetButton`.
 */

module.exports = TweetButton;
