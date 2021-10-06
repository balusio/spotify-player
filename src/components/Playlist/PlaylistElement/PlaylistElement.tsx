import React from 'react';
import { SpotifySong } from 'context/PlaylistContext';

import './PlaylistElement.scss';
interface PlaylistElementInterface {
  name: string;
  songs: SpotifySong[];
}
const PlaylistElement = ({ name, songs }: PlaylistElementInterface) => {
  return (
    <div className="playlist___element">
      <div className="playlist__element_internal">
        <h2>{name}</h2>

        {songs.map(({ id, image, album, song, artist }: SpotifySong) => {
          return (
            <div key={id} className="playlist__song">
              <img src={image} alt={album} />
              <p className="playlist__song__text playlist__song__text--title">
                {song}
              </p>
              <p className="playlist__song__text">{artist}</p>
              <span className="playlist__song__album">{album}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PlaylistElement;
