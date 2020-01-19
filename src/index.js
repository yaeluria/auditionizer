import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase';

import  AuthStore  from './AuthStore';


// const userId = AuthStore.user.uid;
//   firebase
//     .database()
//     .ref(
//       'users/' + userId + '/lists'
//     )
//     .on("value", snapshot => {
//       // console.log("FireB ",snapshot)
//       if (snapshot && snapshot.exists()) {
//          //Set values in state which can be extracted in jsx in render. 
//          console.log(snapshot.val());
//       }})


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    AuthStore.loggedIn = true;
    AuthStore.user = {
      displayName: user.displayName,
      email: user.email,
      metadata: user.metadata,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL, 
      uid: user.uid
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
