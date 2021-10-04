import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from 'context/AuthContext';

import App from '../App';
xdescribe('App Container', () => {
  const { location } = window;

  beforeAll(() => {
    window.location = {
      ...window.location,
      hash: '#access_token=testToken&state=123456',
      href: 'http://nowhere.dev:4200/',
      pathname: '/logged',
    };
    window.location.assign(
      'http://nowhere.dev:4200/logged#access_token=testToken&state=123456'
    );

    console.log(window.location.href, ' href');
  });

  afterAll(() => {
    window.location = location;
  });

  it('should healthcheck the app container', () => {
    console.log(window.location.href, ' href');
    const { container, debug } = render(
      <>
        <AuthProvider>
          <App />
        </AuthProvider>
      </>
    );
    debug();
    expect(
      container.querySelector(`[data-testid="app-container"]`)
    ).toBeInTheDocument();
  });
});
