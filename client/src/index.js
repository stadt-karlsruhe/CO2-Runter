import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Begin state management
import { Provider } from 'react-redux';
import {store} from './features/Store';
// End state management

const root = ReactDOM.createRoot(document.getElementById('root'));
/*
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);
*/
root.render(
      <Provider store={store}>
      <App />
      </Provider>
);


