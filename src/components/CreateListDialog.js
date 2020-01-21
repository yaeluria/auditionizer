import React, {useState} from 'react';
import firebase from '../firebase';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {usePieceStore} from '../usePieceStore';
import {useAuthStore} from '../useAuthStore';


const CreateListDialog = observer(() => { 
  const [listName, setListName] = useState()
  const [open, setOpen] = React.useState(false);
  const pieceStore = usePieceStore();
  const AuthStore = useAuthStore();
  
  
const handleClose = () => {
    setOpen(false);
  };

const handleOpen = () => {
      setOpen(true);
  }
const setName = e => {
    setListName(e.target.value);
}
const createList = () => {
    const userId = AuthStore.user.uid;
    const listsRef = firebase.database().ref('users/' + userId+ '/lists');
    const refForKey = listsRef.push(
      {
        "name": listName,
        "pieces" : pieceStore.pieces.slice()
      }
    )
    pieceStore.currentListId = refForKey.key;
    localStorage.setItem('currentListId', pieceStore.currentListId);
    setListName();
    handleClose();

 }


  return (
    <div>
    <Button
    disabled= {pieceStore.pieces.length <= 0}
    onClick = {handleOpen}
    size="medium"
  >
    Create a list
  </Button>
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="create-list-title">
        <DialogTitle id="create-list-title">Create a new list with the current pieces</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give this list a title (e.g. Berlin Philharmonic Audition December 2020).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="text"
            fullWidth
        
            onChange={setName}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={!listName} onClick={createList} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default CreateListDialog;