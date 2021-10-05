import React, { useMemo, useState } from 'react';
import PlaylistElement from 'components/Playlist/PlaylistElement/PlaylistElement';

const PlaylistContainer = (): JSX.Element => {
  const [playlist, setPlaylist] = useState([]);

  const playlistElements = useMemo(
    () =>
      playlist.map((elem: any) => {
        const { id } = elem;
        return (
          <div key={id}>
            <PlaylistElement {...elem} />
          </div>
        );
      }),
    [playlist]
  );

  return <>{playlistElements}</>;
};

export default PlaylistContainer;
