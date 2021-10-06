import React from 'react';
import { SpotifySong } from 'context/PlaylistContext';

interface PlaylistElementInterface {
  name: string;
  songs: SpotifySong[];
}
const PlaylistElement = ({ name, songs }: PlaylistElementInterface) => {
  return (
    <div className="playlist___element">
      <h6>{name}</h6>

      {songs.map(({ id, image, album, song, artist }: SpotifySong) => {
        return (
          <div key={id}>
            <img src={image} alt={album} />
            <p>{song}</p>
            <span>{artist}</span>
            <span>{album}</span>
          </div>
        );
      })}
    </div>
  );
};
export default PlaylistElement;
