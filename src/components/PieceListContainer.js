import React, { useRef, useState, useEffect} from 'react';
import { observable, computed, toJS} from "mobx"
import { observer } from 'mobx-react-lite';
import PieceList from './PieceList';
import SelectDialog from './SelectDialog';
import CreateListDialog from './CreateListDialog';
import ChooseListDialog from './ChooseListDialog';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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
import GetStarted from './GetStarted';


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
  // const listName = (AppStore.lists && AppStore.lists[AppStore.currentListId] && AppStore.lists[AppStore.currentListId].name)
  // || "No Name";
  const classes = useStyles();
  const [isText, setIsText] = useState(false);
  const [name, setName] = useState();
  const moreThanOneList = Object.keys(toJS(AppStore.lists)).length > 1;

  let textInput = useRef(null);

  useEffect(() => {
    console.log(toJS(AppStore), "from PieceListContainer")
    // console.log(Object.keys(toJS(AppStore.lists)))
    if
    (AppStore.lists && AppStore.lists[AppStore.currentListId] && AppStore.lists[AppStore.currentListId].name){
      setName(AppStore.lists[AppStore.currentListId].name)
      console.log("render");
    }
  },[AppStore.lists]);

  const addPiece = (evt) => {
    evt.preventDefault();
    AppStore.add(textInput.current.value);
    if(!AppStore.pieceFieldError){
        textInput.current.value = '';
      }
  };
  const checkText = e => {
    e.target.value? setIsText(true) : setIsText(false);
    if(AppStore.pieces && AppStore.pieces.some(pieceOnList => pieceOnList.text === e.target.value)){
         AppStore.pieceFieldError = 'You already have this piece in your piece list';
    }
    else{
      AppStore.pieceFieldError = undefined;
    }
  }
  
  const deleteList = p => {
    AppStore.deleteList(p);
    if(AppStore.lists){
      //targets last key in AppStore.lists, which is latest added list
      const nextList = (Object.keys(toJS(AppStore.lists))).slice(-1)[0];
      localStorage.setItem("currentListId", nextList);
      AppStore.currentListId = nextList;
    }
  

  }

  
  return (
    (AppStore.lists && AppStore.lists[AppStore.currentListId])?
   <div>     
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5"> 
           {(AppStore.lists && AppStore.lists[AppStore.currentListId] && AppStore.lists[AppStore.currentListId].name)
             || "No Name"}
             <IconButton edge="end" aria-label="delete" onClick={e => {
                      
                      deleteList(AppStore.currentListId);
                    }}>
                      <DeleteIcon
                      />
                    </IconButton>
              </Typography>

       
            <form onSubmit={addPiece} className={classes.form} >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="pieceName"
                label="Piece Name"
                name="pieceName"
                autoFocus
                onChange={checkText}
                inputRef={textInput}
                helperText={AppStore.pieceFieldError}
              />
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                color="primary"
                disabled={!isText}
              >
                ADD
            </Button>
              <PieceList />
              <SelectDialog />
              <Box display="flex" justifyContent={moreThanOneList ? "space-between" : "center"} >
                <CreateListDialog />
                {moreThanOneList &&
                  <ChooseListDialog />
                }
              </Box>
            </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </div>
     :
      <GetStarted />
      
   
  );
})
export default PieceListContainer;
