import React from 'react';
import CurrentlyPlaying from 'components/CurrentlyPlaying/CurrentlyPlaying';
// import Playlist from 'components/Playlist/PlaylistContainer/PlaylistContainer';
import CreatePlaylist from 'components/CreatePlaylist/CreatePlaylist';
const Dashboard = () => {
  return (
    <>
      <h1> Welcome </h1>
      <CurrentlyPlaying />
      <CreatePlaylist />
    </>
  );
};

export default Dashboard;
