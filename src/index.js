import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import jwtDecode from 'jwt-decode';
import  setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/authActions';

import rootReducers  from './reducers';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const store = createStore(rootReducers,{},
  composeWithDevTools(
      applyMiddleware(logger,thunk)
  )
);
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
