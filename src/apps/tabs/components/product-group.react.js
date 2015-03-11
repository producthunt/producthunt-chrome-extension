/**
 * Dependencies.
 */

let React = require('react');
let moment = require('moment');
let Product = require('./product.react');
let getDay = require('../util/get-day');
let groupByDay = require('../util/group-by-day');

/**
 * Product Group component.
 *
 * Renders the products grouped by date.
 *
 * Usage:
 *
 * ```js
 * <ProductGroup />
 * ```
 *
 * Properties:
 *
 * - `products`: Products to be grouped and rendered.
 * - `onClick`:  On product click cb
 *
 * @class
 */

let ProductGroup = React.createClass({

  /**
   * Render the view.
   */

  render() {
    let groups = groupByDay(this.props.products);
    let onClick = this.props.onClick;
    let out = [];

    Object.keys(groups).map(function(day) {
      let date = moment(day);
      let humanDay = getDay(date);
      let monthDay = date.format('MMMM Do');
      let products = groups[day].map(function(product) {
        return <Product product={product} onClick={onClick} />
      });

      out.push(
        <div className="clear">
          <h2>{humanDay} <span className="date">{monthDay}</span></h2>
          {{products}}
        </div>
      );
    });

    return <div>{{out}}</div>
  }
});

/**
 * Export `ProductGroup`.
 */

module.exports = ProductGroup;
