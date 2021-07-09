import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

// const store = configureStore({})

ReactDOM.render(
  // <Provider store={store}>
  //   <ConnectedRouter history={history}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
    // </ConnectedRouter> 
  // </Provider>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
