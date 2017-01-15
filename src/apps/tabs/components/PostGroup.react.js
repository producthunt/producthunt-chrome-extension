/**
 * Dependencies.
 */

import React from 'react';
import moment from 'moment';
import Post from './Post.react';
import getDay from '../util/getDay';
import groupByDay from '../util/groupByDay';

/**
 * Post Group component.
 *
 * Renders the posts grouped by date.
 *
 * Usage:
 *
 * ```js
 * <PostGroup posts={posts} />
 * ```
 */

export default function PostGroup({ posts }) {
  let groups = groupByDay(posts);
  let out = Object.keys(groups).map(function(day) {
    let date = moment(new Date(day));
    let humanDay = getDay(date);
    let monthDay = date.format('MMMM Do');

    return (
      <div className="clear" key={day}>
        <h2 className="day">
          <span className="title date">{monthDay}</span>
          <span className="featured">{humanDay}</span>
        </h2>
        {groups[day].map((post) => <Post key={post.id} post={post} />)}
      </div>
    );
  });

  return (
    <div>{out}</div>
  );
}
