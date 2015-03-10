/**
 * Dependencies.
 */

let React = require('react');
let buildUrl = require('../util/build-url');

/**
 * Constants.
 */

const FB_BASE = 'https://www.facebook.com/plugins/like.php';

/**
 * Like Button Component.
 *
 * @class
 */

let LikeButton = React.createClass({

  /**
   * Render the view.
   */

  render: function() {
    let attrs = {
      href: this.props.url,
      layout: 'button',
      action: 'like',
      show_face: 'false',
      share: 'false',
      height: '35',
      appId: this.props.appId,
    };

    let src = buildUrl(FB_BASE, attrs);

    return (
      <iframe src={src} scrolling="no" frameborder="0" className="fb" allowTransparency="true"></iframe>
    );
  }
});

/**
 * Export `LikeButton`.
 */

module.exports = LikeButton;
