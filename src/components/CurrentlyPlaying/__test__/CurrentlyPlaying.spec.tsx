import React from 'react';
import { render } from '@testing-library/react';

import CurrentlyPlaying from '../CurrentlyPlaying';

xdescribe('CurrentlyPlaying Container', () => {
  it('should healthcheck the app container', () => {
    const { container, debug } = render(<CurrentlyPlaying />);
    debug();
  });
});
