/**
 * Dependencies.
 */

let React = require('react');
let analytics = require('../../../common/analytics');

/**
 * Post Component.
 *
 * Renders a post inside the default tab.
 *
 * Usage:
 *
 * ```js
 * <Post post={post} />
 * ```
 *
 * Properties:
 *
 * - `post`: Post from the ProductHunt API
 * - `onClick`: On post click cb
 *
 * @class
 */

let Post = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let post = this.props.post;

    return (
      <div className="product clickable" onClick={this._onClick}>
        <div className="image" onClick={this._openPost}>
          <img src={post.screenshot_url['300px']}/>
        </div>

        <div className="container">
          <div className="votes">
            {post.votes_count}
          </div>

          <div className="details">
            <h3><a onClick={this._openPost}>{post.name}</a></h3>
            <p>{post.tagline}</p>
          </div>

          <div className="comments">
            {post.comments_count}
          </div>
        </div>
      </div>
    );
  },

  /**
   * Handle post click events.
   *
   * @param {Object} event
   */

  _onClick(e) {
    analytics.clickPost(this.props.post);
    this.props.onClick(this.props.post.discussion_url);
  },

  /**
   * Handle open post click events.
   *
   * @param {Object} event
   */

  _openPost(e) {
    analytics.clickPost(this.props.post);
    e.stopPropagation();
    open(this.props.post.redirect_url);
  }
});

/**
 * Export `Post`.
 */

module.exports = Post;
