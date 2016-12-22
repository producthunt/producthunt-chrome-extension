/**
 * Dependencies.
 */

let React = require('react');
let moment = require('moment');
let Post = require('./Post.react');
let getDay = require('../util/getDay');
let groupByDay = require('../util/groupByDay');

/**
 * Post Group component.
 *
 * Renders the posts grouped by date.
 *
 * Usage:
 *
 * ```js
 * <PostGroup />
 * ```
 *
 * Properties:
 *
 * - `posts`:   Posts to be grouped and rendered.
 * - `onClick`: On post click cb
 *
 * @class
 */

let PostGroup = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let groups = groupByDay(this.props.posts);
    let out = Object.keys(groups).map(function(day) {
      let date = moment(new Date(day));
      let humanDay = getDay(date);
      let monthDay = date.format('MMMM Do');
      let posts = groups[day].map(function(post) {
        return <Post post={post} />
      });

      return (
        <div className="clear">
          <h2>{humanDay} <span className="date">{monthDay}</span></h2>
          {{posts}}
        </div>
      );
    });

    return <div>{{out}}</div>;
  }
});

/**
 * Export `PostGroup`.
 */

module.exports = PostGroup;
