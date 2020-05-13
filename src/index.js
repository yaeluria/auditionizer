import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { toJS } from "mobx";
import firebase from "./firebase";
import AppStore from "./AppStore";

let currentListId;

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

    const listenToDatbase = (currentListId) => {
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
            const localCurrentListId = localStorage.getItem("currentListId");

            console.log("from index", toJS(AppStore.lists), localCurrentListId);

            currentListId =
              ( AppStore.lists &&
                toJS(AppStore.lists).hasOwnProperty(localCurrentListId) &&
                localCurrentListId) ||
              undefined;
            AppStore.currentListId = currentListId;
            callback(currentListId);
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
