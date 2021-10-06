import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import PlaylistContainer from '../PlaylistContainer';
import {
  PlaylistActions,
  PlaylistActionsTypes,
  PlaylistProvider,
  usePlaylistContext,
} from 'context/PlaylistContext';

// const mockPlaylist = {
//   jorge: [
//     {
//       id: '1FvDJ9KGxcqwv1utyPL3JZ',
//       song: 'This Charming Man - 2011 Remaster',
//       image: 'https://i.scdn.co/image/ab67616d00001e02a09b231129ab1cb1a6efc57f',
//       artist: 'The Smiths',
//       album: 'The Smiths',
//       isPlaying: true,
//     },
//   ],
//   test: [],
// };

const ComponentTriggerLocal = () => {
  const { dispatch } = usePlaylistContext();
  const dispatchEvent = () => {
    dispatch({
      type: PlaylistActionsTypes.ADD_PLAYLIST,
      payload: {
        playlistName: 'test playlist',
      },
    } as PlaylistActions);
  };

  return <button onClick={dispatchEvent}> dispatch Test </button>;
};
describe('Playlist Container', () => {
  it('should not render a playlist', () => {
    render(
      <PlaylistProvider>
        <PlaylistContainer />
      </PlaylistProvider>
    );

    expect(
      screen.findByText('You dont have any playlist, Lets create one')
    ).toBeTruthy();
  });

  it('should render a playlist based on a triggered localStorage', async () => {
    render(
      <PlaylistProvider>
        <ComponentTriggerLocal />
        <PlaylistContainer />
      </PlaylistProvider>
    );

    fireEvent.click(screen.getByText('dispatch Test'));

    await waitFor(() => {
      expect(screen.findByText('test playlist')).toBeTruthy();
    });
  });
});
