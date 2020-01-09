import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase';

import  AuthStore  from './AuthStore';


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    AuthStore.loggedIn = true;
    AuthStore.user = {
      displayName: user.displayName,
      email: user.email,
      metadata: user.metadata,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    };
  }
  else{
    AuthStore.loggedIn = false;
  }

  render(<App />, document.getElementById('root'));

});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
