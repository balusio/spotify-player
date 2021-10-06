import { getLocalStorage, setLocalStorage } from 'core/utils/localStorage';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
export interface SpotifySong {
  id: string;
  image: string;
  artist: string;
  album: string;
  song: string;
  isPlaying: boolean;
}

export enum PlaylistActionsTypes {
  ADD_SONG = 'ADD_SONG',
  REMOVE_SONG = 'REMOVE_SONG',
  ADD_PLAYLIST = 'SAVE_PLAYLIST',
  REMOVE_PLAYLIST = 'EDIT_PLAYLIST',
}

export type PlaylistActions = {
  type: PlaylistActionsTypes;
  payload: {
    playlistName: string;
    song?: SpotifySong;
    playlist?: string;
  };
};

type PlaylistState = Record<string, SpotifySong[]>;
type Dispatch = (action: PlaylistActions) => void;

interface PlaylistStateContext {
  state: PlaylistState;
  dispatch: Dispatch;
}
interface PlaylistContextProps {
  children: ReactNode;
}

const PLAYLIST_LIST_KEY = 'playlists';

/**
 * Playlist context share between components of the playlist the state and
 * manipulation of the playlist based on the user actions
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const PlaylistContext = createContext<PlaylistStateContext | undefined>(
  undefined
);

const PlaylistReducer = (
  state: PlaylistState,
  action: PlaylistActions
): PlaylistState => {
  const { type, payload } = action;
  switch (type) {
    case PlaylistActionsTypes.ADD_SONG: {
      const currentPlaylist = state[payload.playlistName];
      if (payload.song) {
        const newState = {
          ...state,
          [`${payload.playlistName}`]: [payload.song, ...currentPlaylist],
        };
        console.log('playlsit new', newState);
        setLocalStorage(PLAYLIST_LIST_KEY, newState);

        return newState;
      }
      return state;
    }

    case PlaylistActionsTypes.REMOVE_SONG: {
      const currentPlaylist = state[payload.playlistName];
      if (payload.song) {
        const newState = {
          ...state,
          [`${payload.playlistName}`]: currentPlaylist.filter(
            (elem: SpotifySong) => {
              return elem.id !== payload.song?.id;
            }
          ),
        };
        setLocalStorage(PLAYLIST_LIST_KEY, newState);

        return newState;
      }
      return state;
    }

    case PlaylistActionsTypes.ADD_PLAYLIST: {
      if (payload.playlistName) {
        const newState = {
          ...state,
          [`${payload.playlistName}`]: [],
        };
        setLocalStorage(PLAYLIST_LIST_KEY, newState);

        return newState;
      }
      return state;
    }

    case PlaylistActionsTypes.REMOVE_PLAYLIST: {
      const newState = { ...state };
      delete newState[payload.playlistName];

      if (payload.playlistName) {
        setLocalStorage(PLAYLIST_LIST_KEY, newState);

        return {
          ...newState,
        };
      }

      return state;
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

/**
 * spotify handles a callback once the user is logged in,
 * once the page load if the user is comming redirected from spotify and
 * succesfully logged in it should get the params from the URL as queryStrings.
 * The auth method for spotify is "Implicit Grant Flow"
 * @see https://developer.spotify.com/documentation/general/guides/authorization-guide/
 */
const PlaylistProvider = ({ children }: PlaylistContextProps): JSX.Element => {
  const [state, dispatch] = useReducer(
    PlaylistReducer,
    getLocalStorage(PLAYLIST_LIST_KEY)
  );

  const value = { state, dispatch };
  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistContext = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('useUserDispatch must be used within an UserProvider');
  }

  return context;
};

export { usePlaylistContext, PlaylistProvider };
