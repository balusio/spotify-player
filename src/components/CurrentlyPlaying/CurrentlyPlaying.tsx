import { useAuthContext } from 'context/AuthContext';
import useFetch from 'core/utils/hooks/useFetchAPI';
import React, { useEffect, useState } from 'react';

export interface CurrentlyPlayingProps {
  image: string;
  artist: string;
  album: string;
  song: string;
  isPlaying: boolean;
}
const CurrentlyPlaying = (): JSX.Element => {
  const {
    state: { accessToken },
  } = useAuthContext();

  const [currentSong, setCurrentSong] = useState<CurrentlyPlayingProps>({
    song: '',
    image: '',
    artist: '',
    album: '',
    isPlaying: false,
  });

  const { isLoading, data, error } = useFetch({
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  });

  useEffect(() => {
    console.log(data?.item.album.images[2]);
    setCurrentSong({
      song: data?.item?.name,
      image: data?.item.album.images[2].url,
      artist: data?.item?.artists[0].name as string,
      album: data?.item?.album?.name,
      isPlaying: data?.is_playing as never as boolean,
    });
  }, [data]);

  if (error) {
    return <h1>Error on Playing</h1>;
  }
  const { song, image, artist, album, isPlaying } = currentSong;
  return (
    <div className="container__playing">
      <h4>{song}</h4>
      <p>
        {artist}, {album}
      </p>
      <img src={image} />
      {isPlaying && (
        <div className="playing--animation">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
