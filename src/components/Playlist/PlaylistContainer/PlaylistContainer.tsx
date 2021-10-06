import React, { useMemo } from 'react';
import PlaylistElement from 'components/Playlist/PlaylistElement/PlaylistElement';
import { usePlaylistContext } from 'context/PlaylistContext';

const PlaylistContainer = (): JSX.Element => {
  const { state } = usePlaylistContext();

  const playlistElements = useMemo(
    () =>
      Object.keys(state).map((elem: string, idx: number) => {
        return (
          <div key={`${elem}-${idx}`}>
            <PlaylistElement name={elem} songs={state[elem]} />
          </div>
        );
      }),
    [state]
  );

  return <>{playlistElements}</>;
};

export default PlaylistContainer;
