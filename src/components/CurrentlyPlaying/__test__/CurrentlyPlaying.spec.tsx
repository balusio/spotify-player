import React from 'react';
import { render } from '@testing-library/react';

import CurrentlyPlaying from '../CurrentlyPlaying';
import { AuthProvider } from 'context/AuthContext';

describe('CurrentlyPlaying Container', () => {
  it('should healthcheck the app container', () => {
    const { container, debug } = render(
      <AuthProvider>
        <CurrentlyPlaying />
      </AuthProvider>
    );
    debug();
  });
});
