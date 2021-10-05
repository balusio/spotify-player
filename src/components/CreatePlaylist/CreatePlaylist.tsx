import React, { ChangeEvent, useState } from 'react';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPlaylistName(value);
  };

  return (
    <>
      {playlistName}
      <input onChange={onInputChange} />
      <button> Save Playlist</button>
    </>
  );
};

export default CreatePlaylist;
