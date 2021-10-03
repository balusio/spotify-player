import React from 'react';
import { AuthProvider } from 'context/AuthContext';

import './App.scss';
import Login from 'components/Login/Login';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

export default App;
