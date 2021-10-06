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

/**
 * Currently Playing handles multiple actions related to the current song
 * 1.- loads the current song on the screen
 * 2.- Add a song a playlist
 * 3.- remove the current song from the playlist
 */
const CurrentlyPlaying = (): JSX.Element => {
  const {
    state: { accessToken },
  } = useAuthContext();

  const { dispatch } = usePlaylistContext();

  // add song
  const [openListSelect, setOpenListSelect] = useState(false);
  const [playlistValue, setPlaylistValue] = useState('');

  // remove song
  const [openRemoveListSelect, setRemoveListSelect] = useState(false);
  const [removePlaylistValue, setremovePlaylistValue] = useState('');

  // animate on load elements
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

  // load effect with the song, also add the default main animation
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

  // effect to add a song to the context
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

  // effect to remove a song from the context
  useEffect(() => {
    if (removePlaylistValue !== '') {
      dispatch({
        type: PlaylistActionsTypes.REMOVE_SONG,
        payload: {
          playlistName: removePlaylistValue,
          song: currentSong,
        },
      } as PlaylistActions);
      setRemoveListSelect(false);
      console.log(removePlaylistValue, ' on remove');
      console.log(currentSong);
    }
  }, [removePlaylistValue]);

  const { song, image, artist, album, isPlaying } = currentSong;

  // button action that opens the select
  const addSongToPlaylist = (): void => {
    setOpenListSelect(true);
  };

  // it's passed to the select and set the current playlsit that the user wants to add
  const selectPlaylist = (playlistName: string): void => {
    setPlaylistValue(playlistName);
  };

  // button action that opens the select
  const removeSongFromPlaylist = (): void => {
    setRemoveListSelect(true);
  };

  // function passed to remove the current song from the playlist
  const selectRemovePlaylist = (playlistName: string): void => {
    setremovePlaylistValue(playlistName);
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
          {openListSelect && <SelectPlaylist selectPlaylist={selectPlaylist} />}

          <button className="button" onClick={removeSongFromPlaylist}>
            remove from playlist
          </button>
          {openRemoveListSelect && (
            <SelectPlaylist selectPlaylist={selectRemovePlaylist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
