import React from 'react';

const PlaylistElement = ({ image, artist, album, song }: any) => (
  <div className="playlist___element">
    <img src={image} alt={album} />
    <p>{song}</p>
    <span>{artist}</span>
    <span>album</span>
  </div>
);
export default PlaylistElement;
