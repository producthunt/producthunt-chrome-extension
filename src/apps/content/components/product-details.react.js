/**
 * Dependencies.
 */

let React = require('react');

/**
 * Product Details View.
 *
 * Renders the product information inside the product bar.
 *
 * Usage:
 *
 * ```js
 * <ProductDetails product=product />
 * ```
 *
 * Properties:
 *
 * - `product`: product from the ProductHunt API
 *
 * @class
 */

let ProductDetails = React.createClass({

  /**
   * Render the view.
   */

  render: function() {
    let product = this.props.product;

    return (
      <div className="details">
        <div className="votes">
          <span className="ico"></span>
          {product.votes_count}
        </div>
        <div className="comments">
          <span className="ico"></span>
          {product.comments_count}
        </div>
        <a onClick={this.props.onClick}>
          <h1>{product.name}</h1>
          <h2>{product.tagline}</h2>
        </a>
      </div>
    );
  }
});

/**
 * Export `ProductDetails`.
 */

module.exports = ProductDetails;
