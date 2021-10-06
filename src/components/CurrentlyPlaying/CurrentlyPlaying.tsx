import { useAuthContext } from 'context/AuthContext';
import {
  PlaylistActions,
  PlaylistActionsTypes,
  SpotifySong,
  usePlaylistContext,
} from 'context/PlaylistContext';
import { SPOTIFY_API } from 'core/constants';
import useFetch from 'core/utils/hooks/useFetchAPI';
import React, { useEffect, useState } from 'react';

const CurrentlyPlaying = (): JSX.Element => {
  const {
    state: { accessToken },
  } = useAuthContext();
  const { dispatch } = usePlaylistContext();

  const [currentSong, setCurrentSong] = useState<SpotifySong>({
    id: '',
    song: '',
    image: '',
    artist: '',
    album: '',
    isPlaying: false,
  });

  const { isLoading, data, error } = useFetch({
    url: `${SPOTIFY_API}me/player/currently-playing`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  });

  useEffect(() => {
    setCurrentSong({
      id: data?.item.id,
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

  const addSongToPlaylist = (): void => {
    dispatch({
      type: PlaylistActionsTypes.ADD_SONG,
      payload: {
        playlistName: 'test playlist',
        song: currentSong,
      },
    } as PlaylistActions);
  };

  const removeSongFromPlaylist = (): void => {
    dispatch({
      type: PlaylistActionsTypes.REMOVE_SONG,
      payload: {
        playlistName: 'test playlist',
        song: currentSong,
      },
    } as PlaylistActions);
  };

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
      <button onClick={addSongToPlaylist}>Add this song to playlist</button>
      <button onClick={removeSongFromPlaylist}>
        reomve this song to playlist
      </button>
    </div>
  );
};

export default CurrentlyPlaying;
