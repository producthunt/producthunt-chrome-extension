/**
 * Dependencies.
 */

let React = require('react');
let debug = require('debug')('ph:tabs:default-tab');
let InfiniteScroll = require('./InfiniteScroll.react');
let cache = require('lscache');
let async = require('async');
let PostGroup = require('./PostGroup.react');
let PostStore = require('../../../common/stores/PostStore');
let api = require('../../../common/api');

/**
 * Constants.
 */

const CACHE_KEY = process.env.PRODUCTS_CACHE_KEY;

/**
 * Queue for fetching the next page with posts.
 */

let fetch = async.queue(function(daysAgo, cb) {
  debug('fetching next day');
  api.getPosts(daysAgo, cb);
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
 * - `posts`:     Posts to be shown on the page
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

    debug('start page: %d', startPage);

    return {
      posts: this.cache || [],
      startPage: startPage
    };
  },

  /**
   * Before mounting the component, cache the current
   * date.
   */

  componentWillMount() {
    if (this.cache) {
      debug('using cache, refreshing it');
      this._loadNext(0);
    }
  },

  /**
   * On component mount, subscribe to post changes.
   */

  componentDidMount() {
    PostStore.addChangeListener(this._handleChange);
  },

  /**
   * On component unmount, unsubscribe from post changes.
   */

  componentWillUnmount() {
    PostStore.removeChangeListener(this._handleChange);
  },

  /**
   * Render the view.
   */

  render() {
    return (
      <div>
        <div className="products">
          <InfiniteScroll
            loader={<div className="loading">Hunting down posts...</div>}
            pageStart={this.state.startPage}
            loadMore={this._loadNext}
            hasMore={true}>
            <PostGroup posts={this.state.posts} />
          </InfiniteScroll>
        </div>
      </div>
    );
  },

  /**
   * Load next page (day) with posts.
   *
   * @param {Number} page
   */

  _loadNext(daysAgo) {
    fetch.push(daysAgo);
  },

  /**
   * Handle post change event.
   */

  _handleChange() {
    this.setState({ posts: PostStore.getPosts() });
  }
});

/**
 * Export `DefaultTab`.
 */

module.exports = DefaultTab;
