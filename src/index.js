import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_MANAGEMENT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_MANAGEMENT_APP_AUTH0_CLIENT_ID;
// const domain= 'kpatidar.us.auth0.com';
// const clientId= 'vfae6W3ekwaRa301DlOORTgQfi5lHvXg';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri = {window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

