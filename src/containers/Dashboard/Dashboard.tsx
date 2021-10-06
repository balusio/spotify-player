import React from 'react';
import CurrentlyPlaying from 'components/CurrentlyPlaying/CurrentlyPlaying';
import Playlist from 'components/Playlist/PlaylistContainer/PlaylistContainer';
import CreatePlaylist from 'components/CreatePlaylist/CreatePlaylist';
import { PlaylistProvider } from 'context/PlaylistContext';
const Dashboard = () => {
  return (
    <>
      <h1> Welcome </h1>
      <PlaylistProvider>
        <CurrentlyPlaying />
        <CreatePlaylist />
        <p>playlist:</p>
        <Playlist />
      </PlaylistProvider>
    </>
  );
};

export default Dashboard;
