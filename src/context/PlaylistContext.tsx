import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface SpotifySong {
  image: string;
  artist: string;
  album: string;
  song: string;
  isPlaying: boolean;
}
interface PlaylistState {
  playlists: 
}

enum PlaylistActions {
  ADD_SONG = 'ADD_SONG',
  REMOVE_SONG = 'REMOVE_SONG',
  SAVE_PLAYLIST = 'SAVE_PLAYLIST',
  EDIT_PLAYLIST = 'EDIT_PLAYLIST',
}

type Dispatch = (action: PlaylistActions) => void;

type PlaylistContext = {
  state: PlaylistState;
  dispatch: Dispatch;
};
interface UserProviderProps extends PlaylistState {
  children: ReactNode;
}

/**
 * Auth context is a wrapper context to log in the user and check is current status once the app
 * is initialized, also triggers the login action with the API call using the auth credentials
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const PlaylistContext = createContext<PlaylistContext | undefined>(undefined);

const AuthReducer = (state: UserState, action: PlaylistActions): UserState => {
  switch (action) {
    case 'login': {
      return {
        ...state,
        isLoggedIn: true,
        accessToken: '1',
      };
    }
    case 'logout': {
      return {
        ...state,
        isLoggedIn: false,
        accessToken: undefined,
      };
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
const AuthProvider = ({
  children,
  isLoggedIn,
  error,
  accessToken,
}: UserProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLoggedIn: isLoggedIn,
    error: error,
    accessToken: accessToken,
  });

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

export { usePlaylistContext, AuthProvider, PlaylistActions };
