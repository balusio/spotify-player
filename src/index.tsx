import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App/App';

import './core/styles/main.scss';

const Root = (): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log(
    '%c BALU WAS HERE',
    'color: #FFFFFF; font-style: bold; background-color: #000000;padding: 20px'
  );

  return <App />;
};
ReactDOM.render(<Root />, document.getElementById('app'));
