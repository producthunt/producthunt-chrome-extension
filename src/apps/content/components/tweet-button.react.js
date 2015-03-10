/**
 * Dependencies.
 */

let React = require('react');
let buildUrl = require('../util/build-url');

/**
 * Constants.
 */

const TWITTER_BASE = 'https://platform.twitter.com/widgets/tweet_button.html';

/**
 * Tweet Button Component.
 *
 * @class
 */

let TweetButton = React.createClass({

  /**
   * Render the view.
   */

  render: function() {
    let attrs = {
      via: this.props.via,
      url: this.props.url,
      text: this.props.text,
      count: 'none'
    };

    let src = buildUrl(TWITTER_BASE, attrs);

    return (
      <iframe className="tweet" id="tweet-button" allowTransparency="true" frameBorder="0" scrolling="no" src={src}></iframe>
    );
  }
});

/**
 * Export `TweetButton`.
 */

module.exports = TweetButton;
