/**
 * Dependencies.
 */

let React = require('react');
let buildUrl = require('../util/build-url');

/**
 * Constants.
 */

const FB_BASE = 'https://www.facebook.com/plugins/share_button.php';

/**
 * Share Button Component
 *
 * Inserts a Facebook share button on the page.
 *
 * Usage:
 *
 * ```js
 * <ShareButton url="http://www.producthunt.com" appId="fb-app-id" />
 * ```
 *
 * Properties:
 *
 * - `url`:   Page that the user will share
 * - `appId`: Facebook application ID
 *
 * @class
 */

let ShareButton = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let attrs = {
      href: this.props.url,
      layout: 'button',
      height: '35',
      appId: this.props.appId,
    };

    let src = buildUrl(FB_BASE, attrs);

    return (
      <iframe src={src} scrolling="no" frameBorder="0" className="fb" allowTransparency="true"></iframe>
    );
  }
});

/**
 * Export `ShareButton`.
 */

module.exports = ShareButton;
