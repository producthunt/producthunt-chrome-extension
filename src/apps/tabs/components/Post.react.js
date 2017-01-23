/**
 * Dependencies.
 */

import React from 'react';
import analytics from '../../../common/analytics';
import sliceWithRest from '../util/sliceWithRest';

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
 */

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.openPost = this.openPost.bind(this);
  }

  render() {
    let post = this.props.post;
    let [topics, overflow] = sliceWithRest(post.topics, 1);

    return (
      <div className="product clickable" onClick={this.openPost}>
        <div className="gallery">
          <img src={post.screenshot_url['300px']}/>
        </div>
        <div className="details">
          <div className="name featured" title={post.name}>{post.name}</div>
          <div className="tagline">{post.tagline}</div>
          <div className="info">
            <span className="topics">
              {topics.map(({ id, name }) => (
                <span key={id} className="topic">{name}</span>
              ))}
              {overflow.length > 0 &&
                <span title={overflow.map(({ name }) => name).join(', ')}> +{overflow.length}</span>}
            </span>
            <span className="votes">
              {post.votes_count}
            </span>
            <span className="comments">
              {post.comments_count}
            </span>
          </div>
        </div>
      </div>
    );
  }

  openPost(e) {
    e.stopPropagation();
    analytics.clickPost(this.props.post);
    open(this.props.post.discussion_url);
  }
}
