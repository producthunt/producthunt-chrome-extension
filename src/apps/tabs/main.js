/**
 * Dependencies.
 */

import React from 'react';
import DefaultTab from './components/DefaultTab.react';
import renderComponent from '../../common/render';
import loadGoogleAnalytics from '../../common/google-analytics';

/**
 * Constants.
 */

const GA_ID = process.env.GA_ID;

loadGoogleAnalytics(GA_ID);
renderComponent(<DefaultTab />, document.getElementById('main'));
