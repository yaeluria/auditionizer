import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../firebase';

import { useAuthStore } from '../useAuthStore';


const SignInDialog = observer(() => { 

  const [open, setOpen] = React.useState(false);
  const authStore = useAuthStore();
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  
  const openLogin = () => {
      setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <div>
     

     {
       authStore.loggedIn ?
       <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick = {signOut}
        >
        Sign out
        </Button> 
        :
        <Button
        onClick={openLogin}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
      >
       LOGIN
      </Button>
     }  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Dialog>
    </div>
  );
})
export default SignInDialog;