/**
 * Dependencies.
 */

let React = require('react');

/**
 * Product Details View.
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
        <div className="votes">{product.votes_count}</div>
        <div className="comments">{product.comments_count}</div>
        <h1>{product.name}</h1>
        <h2>{product.tagline}</h2>
      </div>
    );
  }
});

/**
 * Export `ProductDetails`.
 */

module.exports = ProductDetails;
