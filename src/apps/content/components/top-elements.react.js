/**
 * Dependencies.
 */

let React = require('react');

/**
 * Constants.
 */

const PRODUCT_BAR_ID = process.env.PRODUCT_BAR_ID;
const PRODUCT_BAR_HEIGHT = process.env.PRODUCT_BAR_HEIGHT;

/**
 * Locals.
 */

let slice = [].slice;
let doc = document;
let win = window;

/**
 * Top Elements Component.
 *
 * Manage all DOM elements that are on top of the page (beginning of the page)
 * and move them below the product bar, when shown.
 *
 * Usage:
 *
 * ```js
 * <TopElements />
 * ```
 *
 * @class
 */

let TopElements = React.createClass({

  /**
   * Find all DOM elements that are on the top of the page
   * and move the below the `ProductBar`.
   */

  componentWillMount: function() {
    this._getTopElements().forEach(function(el) {
      el.style.setProperty('top', PRODUCT_BAR_HEIGHT, 'important');
    });
  },

  /**
   * Restore the top DOM elements.
   */

  componentWillUnmount: function() {
    this._getTopElements().forEach(function(el) {
      el.style.setProperty('top', '0px', 'important');
    });
  },

  /**
   * This component does not render anything.
   *
   * @returns {Boolean} false
   */

  render: function() {
    return false;
  },

  /**
   * Top page elements getter.
   *
   * @returns {Array}
   * @private
   */

  _getTopElements: function() {
    if (!this._elements) {
      let elements = slice.call(doc.querySelectorAll('body *'), 0);

      this._elements = elements.filter(function(el) {
        let style = win.getComputedStyle(el);

        return style.position === 'fixed'
          && style.top == '0px'
          && el.id !== PRODUCT_BAR_ID;
      });
    }

    return this._elements;
  }
});

/**
 * Export `TopElements`.
 */

module.exports = TopElements;
