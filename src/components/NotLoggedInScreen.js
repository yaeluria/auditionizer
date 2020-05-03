// import React from 'react';
// import SignInDialog from './SignInDialog';


// export default function NotLoggedInScreen() {
//     return (
//             <div>
//                <h1>Log in to use Auditionizer</h1>
//                {/* <SignInDialog /> */}
//             </div>
//       )
//     }

import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { useAppStore } from '../useAppStore';

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
     flexDirection: 'column',
     minHeight: '100vh',
   },
   main: {
     marginTop: theme.spacing(8),
     marginBottom: theme.spacing(2),
   },
 }));

const NotLoggedInScreen = observer(() => {


   const AppStore = useAppStore();
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
   const classes = useStyles();

   return (
        <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
           Auditionizer
          </Typography>
         
          <Typography variant="h5" component="h2" gutterBottom>
          <p>Your Audition Jury in the practice room.</p>
          <p>Sign in to get started</p>
          </Typography>
          
          
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
         />
        </Container>
     
        
          </div>
   );
})
export default NotLoggedInScreen;