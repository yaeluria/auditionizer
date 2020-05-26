import React, { useRef, useState, useEffect} from 'react';
import { toJS } from "mobx"
import { observer } from 'mobx-react-lite';
import PieceList from './PieceList';
import SelectDialog from './SelectDialog';
import CreateListDialog from './CreateListDialog';
import ChooseListDialog from './ChooseListDialog';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GetStarted from './GetStarted';
import { useAppStore } from '../useAppStore';

const useStyles = makeStyles(theme => ({
  root:{
    paddingTop: '16px',
    height: 'inherit',
  },
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const PieceListContainer = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);

  const moreThanOneList = AppStore.lists && Object.keys(toJS(AppStore.lists)).length > 1;
  const textInput = useRef();

  useEffect(()=>{
    if((textInput.current && textInput.current.value.length > 0)  && !AppStore.pieceFieldError){
      setDisabled(false);
    }
  },[AppStore.pieceFieldError]);
 
  //todo - can this function be rewritten in more efficient code?
  const checkText = e => {
    AppStore.pieceEntry = e.target.value;
    if (e.target.value && e.target.value.length > 0) {
      if (checkNotIncludes(e)) {
        setDisabled(false);
        AppStore.pieceFieldError = ""
      } else {
        setDisabled(true);
        AppStore.pieceFieldError = "You already have a piece on this list with the same name.";
        textInput.current.select();
      }
    } else {
      setDisabled(true);
      AppStore.pieceFieldError = "";
    }

  }

  const addPiece = (evt) => {
    evt.preventDefault();
    AppStore.add(textInput.current.value);
    textInput.current.value = '';
    textInput.current.focus();
    setDisabled(true);
  };
  const checkNotIncludes = e =>{
    return AppStore.pieces && AppStore.pieces.some(pieceOnList => pieceOnList.text === e.target.value) ? false : true;
  }
 
  const deleteList = p => {
    AppStore.deleteList(p);
    if(AppStore.lists){
      //targets last key in AppStore.lists, which is latest added list
      const nextList = (Object.keys(toJS(AppStore.lists))).slice(-1)[0];
      localStorage.setItem("currentListId", nextList);
      AppStore.localCurrentListId = nextList;
      AppStore.pieceFieldError = '';
    }
  }

  
  return (
    (AppStore.lists && AppStore.lists[AppStore.currentListId])?
   <div className={classes.root}>     
          <Container maxWidth="xs" >
          <div className={classes.centered}>
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
                key={AppStore.currentListId}
              />
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                color="primary"
                disabled={disabled}
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
            </Container>
            </div>
     :
      <GetStarted />
      
   
  );
})
export default PieceListContainer;
