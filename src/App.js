import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAppStore } from './useAppStore';


import Main from './components/Main'
import NotLoggedInScreen from './components/NotLoggedInScreen';

export default function App() {
  // const AppStore = useAppStore()

    return (
          <Router>
            <div>
             <Route exact path="/" component= {Main} />

               {/* <Route exact path="/" component={AppStore.LoggedIn ? Main : NotLoggedInScreen} /> */}
               
            </div>
          </Router>
      )
    }