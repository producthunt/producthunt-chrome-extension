/**
 * Dependencies.
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Utils.
 */

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

/**
 * InfiniteScroll component.
 */

export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);

    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.props.hasMore && this.props.loader}
      </div>
    );
  }

  scrollListener() {
    var el = ReactDOM.findDOMNode(this);
    var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore(this.pageLoaded += 1);
    }
  }

  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  }
}

InfiniteScroll.defaultProps = {
  pageStart: 0 ,
  hasMore: false,
  loadMore: function() {},
  threshold: 250,
  loader: <div></div>,
};
