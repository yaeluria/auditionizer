import React from 'react';
import { observer } from 'mobx-react-lite';
import PieceListContainer from './components/PieceListContainer';
import NotLoggedInScreen from './components/NotLoggedInScreen';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './components/Footer';
import { useAppStore } from './useAppStore';
import Header from './components/Header';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  content: {
    flex: '1 0 auto',
  },
}));

const App = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();
  return (
      <Box className={classes.root}>
        <CssBaseline />
        <Box className={classes.content}>
          <Header />
          <Box>
            {AppStore.loggedIn ?
              <PieceListContainer /> :
              <NotLoggedInScreen />
            }
          </Box>
        </Box>
        <footer>
          <Footer />
        </footer>
      </Box>
  );
})
export default App;