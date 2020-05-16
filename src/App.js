import React from 'react';
import { observer } from 'mobx-react-lite';
import PieceListContainer from './components/PieceListContainer';
import NotLoggedInScreen from './components/NotLoggedInScreen';
import SignInDialog from './components/SignInDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './components/Footer';
import { useAppStore } from './useAppStore';


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
  },
  footer:{
    flexShrink: 0,
  }
}));
// const headerHeight = '7vh';
// const pageContentHeight = '86vh';
// const footerHeight = '7vh';

// <Box height={headerHeight} display="flex">
// <Header />
// </Box>
// <Box height={pageContentHeight} className={classes.pageContent}>
// <Switch>
//   <Route exact path="/" component={HomePage} />
//   <Route path="/newsflash/:id" component={HomePage} />
//   <Route path="/about" component={AboutPage} />
//   <Route path="/thank-you" component={ThankYouPage} />
// </Switch>
// </Box>
// <Box height={footerHeight} display="flex">
// <Footer />
// </Box> 
const App = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();
  return (
    <Box className={classes.root} >
    <CssBaseline />
    <Box className={classes.content}>
    <AppBar position="static" color="default"  >
          <Toolbar className={classes.toolbar}>
          <Box className={classes.toolbarTitle}>
            <Typography variant="h6" color="inherit" noWrap >
              AUDITIONIZER
            </Typography>
            </Box>
            <SignInDialog />
          </Toolbar>
        </AppBar>
        <Box pt={8}>
        {AppStore.loggedIn ?
            <PieceListContainer /> :
            <NotLoggedInScreen />
          } 
        </Box>
    </Box>
    {/* <Box minHeight={headerHeight} display="flex"> */}
        
       {/* </Box> */}
       {/* <Box height={pageContentHeight} className={classes.pageContent}> */}
       
        {/* </Box>  */}
      {/* <Box height={footerHeight} display="flex" flexDirection="column" alignItems="center"> */}
        <footer className="classes.footer">
          <Footer />
        </footer>
      {/* </Box> */}
      </Box>
  );
})
export default App;