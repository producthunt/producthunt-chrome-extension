/**
 * Dependencies.
 */

let React = require('react');

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
    let onClick = this.props.onClick;
    let click = () => this.props.onClick(product.discussion_url);

    return (
      <a onClick={click} className="clickable" target="_blank">
        <div className="product">
          <div className="image">
            <img src={product.screenshot_url['300px']}/>
          </div>

          <div className="container">
            <div className="votes">
              {product.votes_count}
            </div>

            <div className="details">
              <h3>{product.name}</h3>
              <p>{product.tagline}</p>
            </div>

            <div className="comments">
              {product.comments_count}
            </div>
          </div>
        </div>
      </a>
    );
  }
});

/**
 * Export `Product`.
 */

module.exports = Product;
