import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
   //todo - write variables instead of px in height calc - footer height is always 36 (for now).
   // Header height changes according to breakpoints.
   root: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 92px)',
      color: '#FFF5EE',
      backgroundImage:  'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(https://source.unsplash.com/Kx4Mm3ZnZBc)',
      backgroundPosition: "center center",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      [theme.breakpoints.up('sm')]: {
         height: 'calc(100vh - 100px)'
       },
       [`${theme.breakpoints.down('xs')} and (orientation: landscape)`]: {
         height: 'calc(100vh - 84px)'
       },
    },
    main: {
       paddingTop: '100px',
       textAlign: 'center'
    }
 }));

// @media (min-width: 600px)
//  <style>
//  .MuiToolbar-regular {
//      min-height: 64px;
//  }
 
//  @media (min-width: 0px) and (orientation: landscape)
//  <style>
//  .MuiToolbar-regular {
//      min-height: 48px;
//  }
//  <style>
//  .MuiToolbar-regular {
//      min-height: 56px;
//  }
const NotLoggedInScreen = observer(() => {
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
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h5" component="h1" gutterBottom>
           Your Audition Jury in the Practice Room
          </Typography>
          <Typography variant="subtitle1" component="h2" gutterBottom>
          Auditionizer helps you prepare for auditions by keeping track 
          of your list of pieces for each audition and
          simulates the audition process by randomly choosing the pieces for you to play. 
          Sign in to get started.
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