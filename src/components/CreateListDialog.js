import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import {toJS} from 'mobx';
import { observer } from 'mobx-react-lite';

import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { useAppStore } from '../useAppStore';


const CreateListDialog = observer(() => {
  const [listName, setListName] = useState()
  const AppStore = useAppStore();
  // const areLists = () => !AppStore.lists;
  // const [open, setOpen] = React.useState(() => areLists());
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
   setOpen(false);
  };
  // useEffect(() => {
  //   console.log("render creat list")
  //   if (!AppStore.lists){
  //     setOpen(true)
  //   }
  // }, [AppStore.lists]);
  
  const handleOpen = () => {
    setOpen(true);
  }
  const setName = e => {
    setListName(e.target.value);
  }

  // const createList = () => {
  //   const userId = AppStore.user.uid;
  //   const listsRef = firebase.database().ref('users/' + userId + '/lists');
  //   listsRef.push(
  //     {
  //       "name": listName,
  //     }
  //   ).then((snap) => {
  //     const currentListId = snap.key;
  //     localStorage.setItem("currentListId", currentListId)
  //     //sets list name to undefined for next time the dialog opens
  //     setListName();
  //     handleClose();
  //   })
  // }
const afterList = () => {
  console.log(toJS(AppStore), "after");
  setListName();
  handleClose();
}
const createList = e => {
  e.preventDefault();
  console.log(AppStore ,"before");
  AppStore.createList(listName, afterList);
}
  return (
    <div>
      <Button
        onClick={handleOpen}
        size="medium"
      >
        Add a list
  </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="create-list-title">
        <DialogTitle id="create-list-title">Create a new list for your audition pieces</DialogTitle>
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
          <Button 
          onClick={e=>createList(e)}
          disabled={!listName}
            color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default CreateListDialog;