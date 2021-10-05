import React, { createContext, ReactNode, useContext, useReducer } from 'react';
interface UserState {
  isLoggedIn: boolean;
  error: boolean | undefined;
  accessToken: string | undefined;
}

enum AuthActions {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

type Dispatch = (action: AuthActions) => void;

type UserContext = {
  state: UserState;
  dispatch: Dispatch;
};
interface UserProviderProps extends UserState {
  children: ReactNode;
}

/**
 * Auth context is a wrapper context to log in the user and check is current status once the app
 * is initialized, also triggers the login action with the API call using the auth credentials
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
const AuthContext = createContext<UserContext | undefined>(undefined);

const AuthReducer = (state: UserState, action: AuthActions): UserState => {
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
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserDispatch must be used within an UserProvider');
  }

  return context;
};

export { useAuthContext, AuthProvider, AuthActions };
