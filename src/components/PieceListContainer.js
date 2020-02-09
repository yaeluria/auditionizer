import React, { useRef, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import PieceList from './PieceList';
import SelectDialog from './SelectDialog';
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

const PieceListContainer = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();

  let textInput = useRef(null);
//   useEffect(()=>{
//    const currentListId = localStorage.getItem("currentListId");
//    currentListId && (AppStore.currentListId = currentListId); //do I need this?
//   },[])
  
  const addPiece = (evt) => {
    evt.preventDefault();
    AppStore.add(textInput.current.value);
   
    if(!AppStore.pieceFieldError){
        textInput.current.value = '';
      }
    
  };
 const createList = "create a list";
 const chooseList = "Choose from my lists"


  return (
   <div>     
    <Container component="main" maxWidth="xs">
        <CssBaseline />
      
        <div className={classes.paper}>
     
       
          <Typography component="h1" variant="h5"> 
           {(AppStore.lists && AppStore.lists[AppStore.currentListId] && AppStore.lists[AppStore.currentListId].name)
             || "Piece List"} </Typography>

       
          <form onSubmit={addPiece} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="pieceName"
              label="Piece Name"
              name="pieceName"
              autoFocus
              inputRef={textInput}
              helperText={AppStore.pieceFieldError}
            />
            <Button
             type="submit"
             variant="outlined"
             fullWidth
             color="primary"
            >
            ADD
            </Button>
           <PieceList />
          
            <FormControlLabel
              control={<Checkbox value="autoStop" color="primary" />}
              label="Let me know when I should move on to the next piece"
            />
       
            {/* <SelectDialog /> */}
              <Grid container>
              <Grid item xs>
              {
                AppStore.loggedIn ?
                <h1>create list</h1>
                 :
                <LoginTooltip buttonText={createList} />
              }
               
              </Grid>
              <Grid item>
              {
                AppStore.loggedIn ?
                
                <ChooseListDialog />
                 :
                <LoginTooltip buttonText={chooseList} />
              }

              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </div>
      
   
  );
})
export default PieceListContainer;
