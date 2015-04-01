/**
 * Dependencies.
 */

let React = require('react');

/**
 * Header Component.
 *
 * Renders the default tab header.
 *
 * Usage:
 *
 * ```js
 * <Header />
 * ```
 *
 * @class
 */

let Header = React.createClass({

  /**
   * Render the view.
   */

  render() {
    return (
      <header className="main-header">
        <a href="http://www.producthunt.com">
          <img src="/common/header/logo.svg" alt="Product Hunt" className="logo" />
          <div className="title">
            <h1>Product Hunt</h1>
            <h2>The best new products, every day</h2>
          </div>
        </a>
      </header>
    );
  }
});

/**
 * Export `Product`.
 */

module.exports = Header;
