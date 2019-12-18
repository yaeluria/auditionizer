import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import protectedRoute from './components/protectedRoute'; 

import Main from './components/Main'
import SignIn from './components/SignIn';
import Home from './components/Home';



export default function App() {
    return (
          <Router>
            <div>
               <Route exact path="/" component={Main} />
              <Route path="/connect" component={SignIn} />
            </div>
          </Router>
      )
    }