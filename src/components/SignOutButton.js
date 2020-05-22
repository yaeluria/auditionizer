import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';

import firebase from '../firebase';

import { useAppStore } from '../useAppStore';


const SignOutButton = observer(() => { 
  const AppStore = useAppStore();
  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <div>
     {
       AppStore.loggedIn &&
       <Button
        variant="contained"
        color="primary"
        size="small"
        onClick = {signOut}
        >
        Sign out
        </Button> 
    }
    </div>
  );
})
export default SignOutButton;