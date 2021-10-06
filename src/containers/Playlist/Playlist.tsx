import React from 'react';
import CreatePlaylist from 'components/Playlist/CreatePlaylist/CreatePlaylist';
import Playlist from 'components/Playlist/PlaylistContainer/PlaylistContainer';

import './Playlist.scss';

const PlaylistContainer = (): JSX.Element => (
  <div className="playlist-container playlist--space">
    <h2>My playlist:</h2>
    <CreatePlaylist />
    <Playlist />
  </div>
);

export default PlaylistContainer;
