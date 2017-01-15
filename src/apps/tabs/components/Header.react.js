/**
 * Dependencies.
 */

import React from 'react';

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
 */

export default function Header() {
  return (
    <header className="header">
      <a href="https://www.producthunt.com">
        <img className="logo" src="/apps/tabs/assets/logo.svg" alt="Product Hunt"  />
        <h1 className="title">Product Hunt</h1>
      </a>
    </header>
  );
}
