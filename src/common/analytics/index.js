/**
 * Dependencies.
 */

let NullAnalytics = require('./NullAnalytics');
let Tracker = require('./Tracker');

/**
 * Constants.
 */

const ANALYTICS_KEY = process.env.ANALYTICS_KEY;

/**
 * Locals.
 *
 * Note(andreasklinger): window.ProductHuntAnalytics gets set by a custom built of the analytics.js
 *   To recreate this use their make script - it offers a options to set the variable name.
 */

let enableAnalytics = window.ProductHuntAnalytics && ANALYTICS_KEY;
let ProductHuntAnalytics = enableAnalytics ? window.ProductHuntAnalytics : NullAnalytics;
let analytics = new ProductHuntAnalytics(process.env.ANALYTICS_KEY);

/**
 * Export a new `Tracker`.
 */

module.exports = new Tracker(analytics);
