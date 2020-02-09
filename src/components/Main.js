import React, { useRef, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import PieceList from './PieceList';
import PieceListContainer from './PieceListContainer';
import NotLoggedInScreen from './NotLoggedInScreen';
import SelectDialog from './SelectDialog';
import SignInDialog from './SignInDialog';
import LoginTooltip from './LoginTooltip';
import CreateListDialog from './CreateListDialog';
import ChooseListDialog from './ChooseListDialog';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { useAppStore } from '../useAppStore';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       Yael Luria
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
 
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  login:{
    margin: theme.spacing(1, 1.5),
  }
}));

const Main = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();

  let textInput = useRef(null);
  
  const addPiece = (evt) => {
    evt.preventDefault();
    AppStore.add(textInput.current.value);
    if(AppStore.pieceFieldError.length < 0){
      textInput.current.value = '';
    }
  };

 const createList = "create a list";
 const chooseList = "Choose from my lists"
 const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
      <div>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        AUDITIONIZER
        </Typography>
        <SignInDialog />
      </Toolbar>
    </AppBar>
    <div>
      {AppStore.loggedIn?
 <PieceListContainer /> :
 <NotLoggedInScreen />
  }  
    </div> 
 
      </div>
      
   
  );
})
export default Main;
