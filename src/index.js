import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";
import AppStore from "./AppStore";


firebase.auth().onAuthStateChanged(user => {
  if (user) {
    AppStore.loggedIn = true;
    AppStore.user = {
      displayName: user.displayName,
      email: user.email,
      metadata: user.metadata,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid
    };
    const userId = user.uid;

    const listenToDatbase = () => {
      firebase
        .database()
        .ref("users/" + userId)
        .on("value", snapshot => {
          if (snapshot && snapshot.exists()) {
            const user = snapshot.val();
            if (user && user.lists) {
              AppStore.lists = { ...user.lists };
            } 
          }
        else{
            AppStore.lists = undefined;
         }
          
        });
      
    }

    const checkForCurrentId = (callback) => {
      firebase
        .database()
        .ref("users/" + userId)
        .once("value", snapshot => {
          if (snapshot) {
            const user = snapshot.val();
            if (user && user.lists) {
              AppStore.lists = { ...user.lists };
              console.log("there are lists in the database")
            }
            else {
              AppStore.lists = undefined;
            }
            callback();
          }
        })
    }
    checkForCurrentId(listenToDatbase)
  }

  else {
    AppStore.loggedIn = false;
    AppStore.user = null;
  }
render(<App />, document.getElementById("root"));

});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
