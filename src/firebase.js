import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



const config = {
  apiKey: "AIzaSyAG6Ts5nz-WcIJFW2pkpOlmaK3M8wMDp0Q",
  authDomain: "auditionizer.firebaseapp.com",
  databaseURL: "https://auditionizer.firebaseio.com",
  projectId: "auditionizer",
  storageBucket: "auditionizer.appspot.com",
  messagingSenderId: "672161896011",
  appId: "1:672161896011:web:08512ca9158712d05a1fce"
  };
  
  // Initialize Firebase
 firebase.initializeApp(config);



export default firebase;