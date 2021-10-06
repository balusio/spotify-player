import React from 'react';
import CurrentlyPlaying from 'components/CurrentlyPlaying/CurrentlyPlaying';
import Playlist from 'components/Playlist/PlaylistContainer/PlaylistContainer';
import CreatePlaylist from 'components/CreatePlaylist/CreatePlaylist';
import { PlaylistProvider } from 'context/PlaylistContext';
import SpotifyLogo from 'core/assets/img/Spotify_Logo_RGB_Green.png';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <PlaylistProvider>
      <div className="dashboard__container">
        <div className="dashboard__now-playing">
          <div className="dashboard__title dashboard--space">
            <img src={SpotifyLogo} className="dashboard__logo" />
            <h1>Now Playing:</h1>

            <div className="divider divider--horizontal" />
          </div>
          <div className="dashboard--space">
            <CurrentlyPlaying />
          </div>
        </div>
        <div className="dashboard__playlist-container dashboard--space">
          <h2>My playlist:</h2>
          <CreatePlaylist />
          <Playlist />
        </div>
      </div>
    </PlaylistProvider>
  );
};

export default Dashboard;
