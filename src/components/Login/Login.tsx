import React, { useEffect, useState } from 'react';
import { CLIENT_ID, SPOTIFY_AUTH_URL } from 'core/constants';
import { userPersmissions } from 'core/utils/userPermissions';
import SpotifyLogo from 'core/assets/img/Spotify_Icon_RGB_Green.png';

import './Login.scss';

const Login = () => {
  const [animation, setAnimationIn] = useState<string>('');
  useEffect(() => {
    setAnimationIn('animate--startup--in');
  }, []);
  const permissions = [...userPersmissions].join(',');
  const loginPage = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&scope=${permissions}&redirect_uri=http://localhost:4200/logged&state=123456`;

  return (
    <div className="login__container" data-testid="login-container">
      <div className={`login__image-container animate--startup ${animation}`}>
        <img src={SpotifyLogo} alt="spotify_logo" className="login__logo" />
      </div>
      <div className={`login__text-container animate--startup ${animation}`}>
        <h1>Spotify Stalker</h1>
        <p>Login to check what are you doing</p>
        <a
          className="button button__principal button--main"
          href={loginPage}
          type="button"
          data-testid="login-button"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
