import React from 'react';
import { AuthProvider } from 'context/AuthContext';
import Dashboard from 'containers/Dashboard/Dashboard';
import './App.scss';
import Login from 'components/Login/Login';
import useLocalStorage from 'core/utils/hooks/useLocalStorage';
import { getLocalStorage, setLocalStorage } from 'core/utils/localStorage';
interface TokenDetails {
  token: string;
  expiresIn: string | null;
  timeSetted?: string;
}

const App = (): JSX.Element => {
  const tokenDetails = getLocalStorage('token');

  let isLoggedIn = false;
  let accessToken = undefined;
  let error = undefined;
  console.log(tokenDetails, ' TOKEN DETAILS');
  // if we have localstorage token and hasn't expired log the user directly
  if (tokenDetails && tokenDetails.timeSetted) {
    // calculate the current time and the time passed since the token was setted on local storage
    // if the time passed log the user again to refresh the token
    const startTime = new Date();
    const msDifference = +startTime - +new Date(tokenDetails.timeSetted);
    const minutes = Math.floor(msDifference / 1000 / 60);
    const tokenTime = tokenDetails.expiresIn || '3600';

    if (minutes < parseInt(tokenTime) / 60) {
      accessToken = tokenDetails.token;
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  } else {
    // check the url params
    const path = window.location.pathname.substr(1);
    const queryString = window.location.hash;
    const urlParams = new URLSearchParams(queryString);

    const urlToken = urlParams.get('#access_token');
    const stateQuery = urlParams.get('state');
    const errorCode = urlParams.get('error');
    const expiresIn = urlParams.get('expires_in');

    if (urlToken && path === 'logged' && stateQuery === '123456') {
      accessToken = urlToken;
      isLoggedIn = true;
      setLocalStorage('token', {
        token: urlToken,
        expiresIn: expiresIn || '3600',
        timeSetted: new Date().toDateString(),
      });
    }

    if (errorCode && errorCode === 'access_denied' && stateQuery === '123456') {
      error = true;
    }
  }

  return (
    <AuthProvider
      isLoggedIn={isLoggedIn}
      accessToken={accessToken}
      error={error}
    >
      {isLoggedIn ? <Dashboard /> : <Login />}
    </AuthProvider>
  );
};

export default App;
