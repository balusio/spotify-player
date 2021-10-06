import { usePlaylistContext } from 'context/PlaylistContext';
import React, { useState, useEffect } from 'react';

import './CurrentlyPlaying.scss';

interface PlaylistSelectorProps {
  selectPlaylist: (elem: string) => void;
}
const PlaylistSelector = ({ selectPlaylist }: PlaylistSelectorProps) => {
  const { state } = usePlaylistContext();

  const setPlaylistValue = (elem: string) => {
    selectPlaylist(elem);
  };

  return (
    <div className="select__playlist__container">
      <p>Select Playlist:</p>
      {Object.keys(state).map((elem: string, idx: number) => (
        <div key={idx}>
          <span>{elem}</span>
          <button onClick={() => setPlaylistValue(elem)}> + </button>
        </div>
      ))}
    </div>
  );
};

export default PlaylistSelector;
