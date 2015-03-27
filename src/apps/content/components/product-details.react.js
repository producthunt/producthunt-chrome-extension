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

  render() {
    let product = this.props.product;

    return (
      <div className="details">
        <div className="votes">
          {product.votes_count}
        </div>

        <h1>{product.name}</h1>
        <h2>{product.tagline}</h2>

        <div className="comments">
          {product.comments_count}
        </div>
      </div>
    );
  }
});

/**
 * Export `ProductDetails`.
 */

module.exports = ProductDetails;
