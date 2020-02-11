import React from 'react';
import { render } from 'react-dom';
import {toJS} from 'mobx';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase';
import  AppStore  from './AppStore';



firebase.auth().onAuthStateChanged((user) => {
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
      firebase
      .database()
      .ref(
        'users/' + userId 
      )
      .on("value", snapshot => {
        if (snapshot && snapshot.exists()) {
          const user = snapshot.val();
                   if (user && user.lists){
                     console.log({...user.lists});
                     AppStore.lists = {...user.lists};
              
                 const piecesObject = user.lists[AppStore.currentListId] && toJS(user.lists[AppStore.currentListId].pieces)
                 AppStore.pieces = piecesObject ? Object.values(piecesObject) : [];
                   }}
                   else{
                     AppStore.lists = {}
                   }
                   const localCurrentListId = localStorage.getItem("currentListId")
                   console.log(localCurrentListId);
                   console.log(toJS(AppStore.lists));
                
                   AppStore.currentListId = (AppStore.lists.hasOwnProperty(localCurrentListId) && localCurrentListId) || null ;
               
                   console.log(AppStore.currentListId);
                   if(!AppStore.currentListId){
                     const listsRef = firebase.database().ref('users/' + userId+ '/lists');
                     // first make sure user doesn't have a list called piece list
                     const refForKey = listsRef.push(
                     {
                       "name": "Piece List",
                     }
                   )
               
                   const currentListId = refForKey.key;
                   AppStore.currentListId  = currentListId;
                   localStorage.setItem("currentListId", currentListId)
                   }
                   console.log(AppStore.currentListId);
                })
          }
            else{
              AppStore.loggedIn = false;
              AppStore.user = null;
            }
  

  render(<App />, document.getElementById('root'));

});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
