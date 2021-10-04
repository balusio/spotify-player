import React from 'react';
import { CLIENT_ID } from 'core/constants';
import { userPersmissions } from 'core/utils/userPermissions';
import SpotifyLogo from 'core/assets/img/Spotify_Icon_RGB_Green.png';

const Login = () => {
  const permissions = [...userPersmissions].join(',');
  const loginPage = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${permissions}&redirect_uri=http://localhost:4200/logged&state=123456`;

  return (
    <div className="container" data-testid="app-container">
      <img src={SpotifyLogo} style={{ width: '200px' }} />
      <h1>Spotify Stalker, login to check what are you doing </h1>
      <a href={loginPage} type="button">
        Login
      </a>
    </div>
  );
};

export default Login;
