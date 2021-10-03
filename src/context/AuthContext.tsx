import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { CLIENT_ID } from 'core/constants';
import useFetch from 'core/utils/hooks/useFetchAPI';

interface UserState {
  isLoggedIn: boolean;
  userId: string | undefined;
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
        userId: '1',
      };
    }
    case 'logout': {
      return {
        ...state,
        isLoggedIn: false,
        userId: undefined,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const AuthProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLoggedIn: false,
    userId: undefined,
  });
  // const { isLoading, data, error } = useFetch({
  //   url: `https://accounts.spotify.com/authorize?response_type=code
  //   &client_id${CLIENT_ID}&scope=ser-read-private,user-read-email`,
  //   options: {
  //     method: 'GET',
  //   },
  // });
  // useEffect(() => {
  //   console.log(isLoading);
  //   console.log(data);
  //   console.log(error);
  // }, [data]);
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
