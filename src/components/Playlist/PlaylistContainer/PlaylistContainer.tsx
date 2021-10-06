import React, { useMemo } from 'react';
import PlaylistElement from 'components/Playlist/PlaylistElement/PlaylistElement';
import { usePlaylistContext } from 'context/PlaylistContext';

const PlaylistContainer = (): JSX.Element => {
  const { state } = usePlaylistContext();

  // avoid unnecesary re renders from other elements, check only if the playlist are updated
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

  return (
    <div className="playlist__list__container">
      {playlistElements.length > 0 ? (
        playlistElements
      ) : (
        <p>You dont have any playlist, Lets create one</p>
      )}
    </div>
  );
};

export default PlaylistContainer;
