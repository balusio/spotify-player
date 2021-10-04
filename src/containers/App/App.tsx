import React, { useEffect } from 'react';
import { AuthProvider, useAuthContext } from 'context/AuthContext';
import Dashboard from 'containers/Dashboard/Dashboard';
import './App.scss';
import Login from 'components/Login/Login';

const App = (): JSX.Element => {
  const {
    state: { isLoggedIn, error },
  } = useAuthContext();

  // read the route status of the app and check if the user is already logged in,
  // in case is logged in fire the hook that assumes the user is online.
  // load the main app
  //otherwise, log the user
  if (error) {
    console.log('yes, serror on estat');
    return <h1>upps something wentWrong</h1>;
  }

  return <AuthProvider>{isLoggedIn ? <Dashboard /> : <Login />}</AuthProvider>;
};

export default App;
