/**
 * Dependencies.
 */

var React = require('react');
var ReactDOM = require('react-dom');

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

var InfiniteScroll = React.createClass({
  getDefaultProps: function() {
    return {
      pageStart: 0 ,
      hasMore: false,
      loadMore: function() {},
      threshold: 250,
      loader: <div></div>,
    };
  },
  componentDidMount: function() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  },

  componentDidUpdate: function() {
    this.attachScrollListener();
  },

  componentWillUnmount: function() {
    this.detachScrollListener();
  },

  render: function() {
    return (
      <div>
        {this.props.children}
        {this.props.hasMore && this.props.loader}
      </div>
    );
  },

  scrollListener: function() {
    var el = ReactDOM.findDOMNode(this);
    var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore(this.pageLoaded += 1);
    }
  },

  attachScrollListener: function() {
    if (!this.props.hasMore) {
      return;
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  },

  detachScrollListener: function() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  },
});

module.exports = InfiniteScroll;
