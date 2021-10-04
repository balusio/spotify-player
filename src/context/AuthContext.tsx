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
interface UserProviderProps {
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

const AuthProvider = ({ children }: UserProviderProps): JSX.Element => {
  const path = window.location.pathname.substr(1);
  const queryString = window.location.hash;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);

  const urlToken = urlParams.get('#access_token');
  const stateQuery = urlParams.get('state');
  const errorCode = urlParams.get('error');

  console.log({
    urlToken,
    stateQuery,
    errorCode,
    path,
    queryString,
  });
  let isLoggedIn = false;
  let accessToken = undefined;
  let error = undefined;

  if (urlToken && path === 'logged' && stateQuery === '123456') {
    accessToken = urlToken;
    isLoggedIn = true;
  }

  if (errorCode && errorCode === 'access_denied' && stateQuery === '123456') {
    error = true;
  }

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
