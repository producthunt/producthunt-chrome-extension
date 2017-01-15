/**
 * Dependencies.
 */

import React from 'react';
import InfiniteScroll from './InfiniteScroll.react';
import cache from 'lscache';
import async from 'async';
import PostStore from '../../../common/stores/PostStore';
import api from '../../../common/api';
import PostGroup from './PostGroup.react';
import Header from './Header.react';

/**
 * Constants.
 */

const CACHE_KEY = process.env.PRODUCTS_CACHE_KEY;

/**
 * Debuger.
 */

const debug = require('debug')('ph:tabs:default-tab');

/**
 * Queue for fetching the next page with posts.
 */

const fetch = async.queue(function(daysAgo, cb) {
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
 */

export default class DefaultTab extends React.Component {

  /**
   * Return initial state.
   */

  constructor(props) {
    super(props);

    this.loadNext = this.loadNext.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.cache = cache.get(CACHE_KEY);

    let firstPageCached = !!this.cache;

    // if we have cache, this means the first page has been already
    // fetched, therefore start from the next one
    let startPage = firstPageCached ? 0 : -1;

    debug('start page: %d', startPage);

    this.state = {
      posts: this.cache || [],
      startPage: startPage,
    };
  }

  /**
   * Before mounting the component, cache the current
   * date.
   */

  componentWillMount() {
    if (this.cache) {
      debug('using cache, refreshing it');
      this.loadNext(0);
    }
  }

  /**
   * On component mount, subscribe to post changes.
   */

  componentDidMount() {
    PostStore.addChangeListener(this.handleChange);
  }

  /**
   * On component unmount, unsubscribe from post changes.
   */

  componentWillUnmount() {
    PostStore.removeChangeListener(this.handleChange);
  }

  /**
   * Render the view.
   */

  render() {
    return (
      <div>
        <Header />
        <div className="products">
          <InfiniteScroll
            loader={<div className="featured loading">Hunting down posts...</div>}
            pageStart={this.state.startPage}
            loadMore={this.loadNext}
            hasMore={true}>
            <PostGroup posts={this.state.posts} />
          </InfiniteScroll>
        </div>
      </div>
    );
  }

  /**
   * Load next page (day) with posts.
   *
   * @param {Number} page
   */

  loadNext(daysAgo) {
    fetch.push(daysAgo);
  }

  /**
   * Handle post change event.
   */

  handleChange() {
    this.setState({ posts: PostStore.getPosts() });
  }
}
