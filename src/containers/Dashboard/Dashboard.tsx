import { useAuthContext } from 'context/AuthContext';
import useFetch from 'core/utils/hooks/useFetchAPI';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const {
    state: { accessToken },
  } = useAuthContext();

  const { isLoading, data, error } = useFetch({
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) {
    console.log(error, '=== ERRROR= ');
  }
  return <></>;
};

export default Dashboard;
