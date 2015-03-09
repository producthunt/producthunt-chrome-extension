/**
 * Dependencies.
 */

let React = require('react');
let Frame = require('react-frame-component');
let ProductStore = require('../stores/product-store');
let BodyModifier = require('./body-modifier.react');
let TopElements = require('./top-elements.react');
let ProductDetails = require('./product-details.react');
let ReactPropTypes = React.PropTypes;

/**
 * Constants.
 */

const PRODUCT_BAR_ID = process.env.PRODUCT_BAR_ID;

/**
 * Product Bar.
 *
 * @class
 */

let ProductBar = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState: function() {
    return {};
  },

  /**
   * On component mount, subscribe to product changes.
   */

  componentDidMount: function() {
    ProductStore.addChangeListener(this._handleChange);
  },

  /**
   * On component unmount, unsubscribe from product changes.
   */

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._handleChange);
  },

  /**
   * Render the view.
   */

  render: function() {
    let product = this.state.product;

    if (!product) return false;

    return (
      <div>
        <BodyModifier />
        <Frame className="__phc-bar" id={PRODUCT_BAR_ID} scrolling="no" head={
          <link type='text/css' rel='stylesheet' href='product-bar.css' />
        }>
          <ProductDetails product={this.state.product} />
          <a className="close" onClick={this._onCloseClick}>x</a>
        </Frame>
        <TopElements />
      </div>
    );
  },

  /**
   * Handle close events. It will unmount the current
   * component.
   */

  _onCloseClick: function() {
    let node = this.getDOMNode().parentNode;
    React.unmountComponentAtNode(node);
  },

  /**
   * Handle product change event.
   */

  _handleChange: function() {
    this.setState({ product: ProductStore.getProduct() });
  }
});

/**
 * Export `ProductBar`.
 */

module.exports = ProductBar;
