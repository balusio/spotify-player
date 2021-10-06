import { usePlaylistContext } from 'context/PlaylistContext';
import React, { useState, useEffect } from 'react';

import './CurrentlyPlaying.scss';

interface PlaylistSelectorProps {
  selectPlaylist: (elem: string) => void;
}

/**
 *
 * Playlist selector shows the current playlist on currentlyPlaying scree, so the user is capable to check to what playlist
 * show or hide his song
 * @returns
 */
const PlaylistSelector = ({ selectPlaylist }: PlaylistSelectorProps) => {
  const { state } = usePlaylistContext();

  const setPlaylistValue = (elem: string) => {
    selectPlaylist(elem);
  };

  return (
    <div className="select__playlist__container">
      <p>Select Playlist:</p>
      <div className="select__playlist__navigate">
        {Object.keys(state).map((elem: string, idx: number) => (
          <div key={idx}>
            <span>{elem}</span>
            <button onClick={() => setPlaylistValue(elem)}> + </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSelector;
