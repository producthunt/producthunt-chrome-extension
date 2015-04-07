/**
 * Dependencies.
 */

let React = require('react');

/**
 * Post Details View.
 *
 * Renders the post information inside the product bar.
 *
 * Usage:
 *
 * ```js
 * <PostDetails post=post />
 * ```
 *
 * Properties:
 *
 * - `post`: post from the ProductHunt API
 *
 * @class
 */

let PostDetails = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let post = this.props.post;

    return (
      <div className="details">
        <div className="votes">
          {post.votes_count}
        </div>

        <h1>{post.name}</h1>
        <h2>{post.tagline}</h2>

        <div className="comments">
          {post.comments_count}
        </div>
      </div>
    );
  }
});

/**
 * Export `PostDetails`.
 */

module.exports = PostDetails;
