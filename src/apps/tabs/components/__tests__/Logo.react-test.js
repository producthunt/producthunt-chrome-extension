jest.autoMockOff();

import React from 'react';
import Logo from '../Logo.react';

describe('Logo', function() {
  it('renders the Product Hunt header', function() {
    expect(<Logo />).toRender('Product Hunt');
  });
});
