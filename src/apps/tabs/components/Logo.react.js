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

export default function Logo() {
  return (
    <a href="https://www.producthunt.com" title="Product Hunt" className="logo">
      <img src="/apps/tabs/assets/logo.svg" alt="Product Hunt"  />
    </a>
  );
}
