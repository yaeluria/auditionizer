import React from 'react';

import AuthStore from '../AuthStore';
import { Redirect } from 'react-router-dom';

const protectedRoute = (RouteComponent) => {
//check if this syntax works. if not, use useStore.
  if (AuthStore.loggedIn) {
    return <RouteComponent />
  }
  return <Redirect to="/connect" />
};

export default protectedRoute;