/**
 * Dependencies.
 */

let React = require('react');
let InfiniteScroll = require('react-infinite-scroll')(React);
let moment = require('moment');
let cache = require('lscache');
let async = require('async');
let ProductGroup = require('./product-group.react');
let Header = require('./header.react');
let ProductStore = require('../../../common/stores/product');
let api = require('../../../common/api');
let Pane = require('../../../common/product-pane/pane.react');

/**
 * Constants.
 */

const CACHE_KEY = process.env.PRODUCTS_CACHE_KEY;

/**
 * Queue for fetching the next page with products.
 */

let fetch = async.queue(function(daysAgo, cb) {
  api.getProducts(daysAgo, cb);
});

/**
 * Default Tab component.
 *
 * Renders the default tab app.
 *
 * Usage:
 *
 * ```js
 * <DefaultTab />
 * ```
 *
 * State:
 *
 * - `products`:  Products to be shown on the page
 * - `url`:       Product pane url
 * - `startPage`: Start fetching posts from `startPage` days ago
 *
 * @class
 */

let DefaultTab = React.createClass({

  /**
   * Return initial state.
   *
   * @returns {Object}
   */

  getInitialState() {
    this.cache = cache.get(CACHE_KEY);

    let firstPageCached = !!this.cache;

    // if we have cache, this means the first page has been already
    // fetched, therefore start from the next one
    let startPage = firstPageCached ? 0 : -1;

    return {
      products: this.cache || [],
      startPage: startPage
    };
  },

  /**
   * Before mounting the component, cache the current
   * date.
   */

  componentWillMount() {
    // using cache, refresh it
    if (this.cache) this._loadNext(0);
  },

  /**
   * On component mount, subscribe to product changes.
   */

  componentDidMount() {
    ProductStore.addChangeListener(this._handleChange);
  },

  /**
   * On component unmount, unsubscribe from product changes.
   */

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._handleChange);
  },

  /**
   * Render the view.
   */

  render() {
    let url = this.state.url;

    return (
      <div>
        <div className="main">
          <Header />
          <div className="products">
            <InfiniteScroll
              loader={<div className="loading">Hunting down posts...</div>}
              pageStart={this.state.startPage}
              loadMore={this._loadNext}
              hasMore={true}>
              <ProductGroup products={this.state.products} onClick={this._openPane} />
            </InfiniteScroll>
          </div>

          <Pane
            bodyClass="no-scroll"
            loaderClass="loader"
            overlayClass="overlay"
            closeClass="close"
            paneClass="pane"
            url={url}
            onClick={this._closePane} />
        </div>
      </div>
    );
  },

  /**
   * Open the product pane.
   *
   * @param {String} url
   */

  _openPane(url) {
    this.setState({ url: url });
  },

  /**
   * Close the product pane.
   */

  _closePane() {
    this.setState({ url: false });
  },

  /**
   * Load next page (day) with products.
   *
   * @param {Number} page
   */

  _loadNext(daysAgo) {
    fetch.push(daysAgo);
  },

  /**
   * Handle product change event.
   */

  _handleChange() {
    this.setState({ products: ProductStore.getProducts() });
  }
});

/**
 * Export `DefaultTab`.
 */

module.exports = DefaultTab;
