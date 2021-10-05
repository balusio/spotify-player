import React from 'react';
import { CLIENT_ID, SPOTIFY_AUTH_URL } from 'core/constants';
import { userPersmissions } from 'core/utils/userPermissions';
import SpotifyLogo from 'core/assets/img/Spotify_Icon_RGB_Green.png';

const Login = () => {
  const permissions = [...userPersmissions].join(',');
  const loginPage = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&scope=${permissions}&redirect_uri=http://localhost:4200/logged&state=123456`;

  return (
    <div className="container" data-testid="app-container">
      <img src={SpotifyLogo} style={{ width: '200px' }} />
      <h1>Spotify Stalker, login to check what are you doing</h1>
      <a
        className="button button__principal button--main"
        href={loginPage}
        type="button"
        data-testid=""
      >
        Login
      </a>
    </div>
  );
};

export default Login;
