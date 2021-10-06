import {
  PlaylistActions,
  PlaylistActionsTypes,
  usePlaylistContext,
} from 'context/PlaylistContext';
import React, { ChangeEvent, useState } from 'react';

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
    <>
      {playlistName}
      <input onChange={onInputChange} value={playlistName} />
      <button onClick={savePlaylist}> Save Playlist</button>
    </>
  );
};

export default CreatePlaylist;
