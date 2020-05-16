import React from 'react';
import { observer } from 'mobx-react-lite';
import PieceListContainer from './PieceListContainer';
import NotLoggedInScreen from './NotLoggedInScreen';
import SignInDialog from './SignInDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './Footer';
import { useAppStore } from '../useAppStore';


const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  content:{
    flex: '1 0 auto',
    color: 'red'
  },
  footer:{
    marginTop: 'auto',
    flexShrink: 0
  }
}));

const Main = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();
  return (
    <div className="classes.root">
      <CssBaseline />
      <div className="classes.content">
        <AppBar position="static" color="default"  >
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              AUDITIONIZER
        </Typography>
            <SignInDialog />
          </Toolbar>
        </AppBar>
       <div>
        {AppStore.loggedIn ?
            <PieceListContainer /> :
            <NotLoggedInScreen />
          } 
        </div> 
      </div>
      <footer className="classes.footer">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
})
export default Main;
