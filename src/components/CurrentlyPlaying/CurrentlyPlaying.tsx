import React, { useEffect, useState } from 'react';

import {
  PlaylistActions,
  PlaylistActionsTypes,
  SpotifySong,
  usePlaylistContext,
} from 'context/PlaylistContext';
import { useAuthContext } from 'context/AuthContext';
import { SPOTIFY_API } from 'core/constants';
import useFetch from 'core/utils/hooks/useFetchAPI';
import SelectPlaylist from './SelectPlaylist';

import './CurrentlyPlaying.scss';

const CurrentlyPlaying = (): JSX.Element => {
  const {
    state: { accessToken },
  } = useAuthContext();
  const { dispatch } = usePlaylistContext();
  const [openListSelect, setOpenListSelect] = useState(false);
  const [playlistValue, setPlaylistValue] = useState('');
  const [animateIn, setAnimateIn] = useState('');
  const [currentSong, setCurrentSong] = useState<SpotifySong>({
    id: '',
    song: '',
    image: '',
    artist: '',
    album: '',
    isPlaying: false,
  });

  const { data, error } = useFetch({
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
      id: data?.item?.id,
      song: data?.item?.name,
      image: data?.item?.album?.images[1]?.url,
      artist: data?.item?.artists[0]?.name as string,
      album: data?.item?.album?.name,
      isPlaying: data?.is_playing as never as boolean,
    });
    setAnimateIn('animate--startup--in');
  }, [data]);

  useEffect(() => {
    if (playlistValue !== '') {
      dispatch({
        type: PlaylistActionsTypes.ADD_SONG,
        payload: {
          playlistName: playlistValue,
          song: currentSong,
        },
      } as PlaylistActions);
      setOpenListSelect(false);
    }
  }, [playlistValue]);

  const { song, image, artist, album, isPlaying } = currentSong;

  const addSongToPlaylist = (): void => {
    setOpenListSelect(true);
  };

  const removeSongFromPlaylist = (): void => {
    dispatch({
      type: PlaylistActionsTypes.REMOVE_SONG,
      payload: {
        playlistName: playlistValue,
        song: currentSong,
      },
    } as PlaylistActions);
  };

  const selectPlaylist = (playlistName: string): void => {
    // const value = e.target.value;
    // console.log(' VALUE CHANGED');
    setPlaylistValue(playlistName);
  };

  if (error) {
    return <h1>Error on Playing</h1>;
  }

  return (
    <div className="playing__container">
      <div className={`playing__image  animate--startup ${animateIn}`}>
        <img src={image} />
      </div>
      <div className="playing_content">
        <div className={`playing__text animate--startup ${animateIn}`}>
          <h2>{song}</h2>
          <h3>{artist}</h3>
          <h4>{album}</h4>
        </div>
        <div className={`playing__actions animate--startup ${animateIn}`}>
          {isPlaying && (
            <div className={`playing--animation animate--startup ${animateIn}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <button
            className="button button__principal button--main"
            onClick={addSongToPlaylist}
          >
            Add to playlist
          </button>
          {openListSelect && (
            <SelectPlaylist selectPlaylist={selectPlaylist} />
            // <>
            //   <select value="" onChange={selectPlaylist}>
            //     <option value=""> </option>
            //     {Object.keys(state).map((elem: string, idx: number) => (
            //       <option value={elem} key={idx}>
            //         {elem}
            //       </option>
            //     ))}
            //   </select>
            //   <span>song added to {playlistValue}</span>
            // </>
          )}
          <button className="button" onClick={removeSongFromPlaylist}>
            remove from playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
