import {
  PlaylistActions,
  PlaylistActionsTypes,
  usePlaylistContext,
} from 'context/PlaylistContext';
import React, { ChangeEvent, useState } from 'react';

import './CreatePlaylist.scss';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState<string>('');
  const { dispatch } = usePlaylistContext();
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPlaylistName(value);
  };

  const savePlaylist = (): void => {
    dispatch({
      type: PlaylistActionsTypes.ADD_PLAYLIST,
      payload: {
        playlistName: playlistName,
      },
    } as PlaylistActions);
  };

  return (
    <div className="create-playlist__container">
      <input
        className="create-playlist__input"
        onChange={onInputChange}
        value={playlistName}
        placeholder="Create new playlist"
      />
      <button
        className="button button__principal create-playlist__button"
        onClick={savePlaylist}
      >
        Create
      </button>
    </div>
  );
};

export default CreatePlaylist;
