import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CreatePlaylist from '../CreatePlaylist';
import PlaylistContainer from 'components/Playlist/PlaylistContainer/PlaylistContainer';
import { PlaylistProvider } from 'context/PlaylistContext';

describe('Playlist Container', () => {
  it('should not render a playlist', () => {
    render(
      <PlaylistProvider>
        <PlaylistContainer />
        <CreatePlaylist />
      </PlaylistProvider>
    );

    expect(
      screen.findByText('You dont have any playlist, Lets create one')
    ).toBeTruthy();
    expect(screen.findByPlaceholderText('Create new playlist')).toBeTruthy();
  });

  xit('should render a playlist based on a triggered localStorage', async () => {
    const { queryByPlaceholderText } = render(
      <PlaylistProvider>
        <CreatePlaylist />
        <PlaylistContainer />
      </PlaylistProvider>
    );
    const element = queryByPlaceholderText('Create new playlist');
    fireEvent.change(element as HTMLElement, {
      target: { value: 'new Playlist' },
    });

    await waitFor(() => expect(screen.findByText('new Playlist')).toBeTruthy());
  });
});
