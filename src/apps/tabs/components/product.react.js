/**
 * Dependencies.
 */

let React = require('react');
let analytics = require('../../../common/analytics');

/**
 * Product Component.
 *
 * Renders a product inside the default tab.
 *
 * Usage:
 *
 * ```js
 * <Product product={product} />
 * ```
 *
 * Properties:
 *
 * - `product`: Product from the ProductHunt API
 * - `onClick`: On product click cb
 *
 * @class
 */

let Product = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let product = this.props.product;

    return (
      <div className="product clickable" onClick={this._onClick}>
        <div className="image">
          <img src={product.screenshot_url['300px']}/>
        </div>

        <div className="container">
          <div className="votes">
            {product.votes_count}
          </div>

          <div className="details">
            <h3><a onClick={this._openProduct}>{product.name}</a></h3>
            <p>{product.tagline}</p>
          </div>

          <div className="comments">
            {product.comments_count}
          </div>
        </div>
      </div>
    );
  },

  /**
   * Handle product click events.
   *
   * @param {Object} event
   */

  _onClick(e) {
    analytics.clickPost(this.props.product);
    this.props.onClick(this.props.product.discussion_url);
  },

  /**
   * Handle open product click events.
   *
   * @param {Object} event
   */

  _openProduct(e) {
    analytics.clickPost(this.props.product);
    e.stopPropagation();
    open(this.props.product.redirect_url);
  }
});

/**
 * Export `Product`.
 */

module.exports = Product;
