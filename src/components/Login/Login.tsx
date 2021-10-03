import React, { useEffect } from 'react';
import { CLIENT_ID } from 'core/constants';
import { useAuthContext, AuthActions } from 'context/AuthContext';

import SpotifyLogo from 'core/assets/img/Spotify_Icon_RGB_Green.png';

const Login = () => {
  const loginPage = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&scope=user-read-private,user-read-email&redirect_uri=http://localhost:4200/logged`;
  const {
    state: { isLoggedIn },
    dispatch,
  } = useAuthContext();

  useEffect(() => {
    setTimeout(() => {
      dispatch(AuthActions.LOGIN);
    }, 5000);
  }, []);

  return (
    <div className="container" data-testid="app-container">
      {isLoggedIn ? (
        <h1>GO TO THE OTHER PART OF THE APP</h1>
      ) : (
        <>
          <img src={SpotifyLogo} style={{ width: '200px' }} />
          <h1>Spotify Stalker, login to check what are you doing </h1>
          <a href={loginPage} type="button">
            Login
          </a>
        </>
      )}
    </div>
  );
};

export default Login;
