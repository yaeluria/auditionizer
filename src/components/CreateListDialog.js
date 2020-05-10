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
import TextField from '@material-ui/core/TextField';
import { useAppStore } from '../useAppStore';


const CreateListDialog = observer(() => {
  const [listName, setListName] = useState();
  const [createDisabled, setCreateDisabled] = useState(true);
  const [nameError, setNameError] = useState();
  const [open, setOpen] = React.useState(false);

  const AppStore = useAppStore();
  
  const handleClose = () => {
   setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  }
  const setName = e => {
    if (e.target.value && e.target.value.length > 0) {
      if (checkName(e.target.value)) {
        setNameError();
        setCreateDisabled(false);
        setListName(e.target.value)
      } else {
        setCreateDisabled(true);
        setNameError("You already have a list with the same name.")
      }
    } else {
      setCreateDisabled(true);
    }
  }

  const checkName = n => {
    const listsObject = toJS(AppStore.lists);
    const listNamesArray = []
    for (const list in listsObject) {
      listNamesArray.push(listsObject[list].name);
    }
    if (listNamesArray.includes(n)) {
      return false;
    }
    else return true;
  }

  const afterList = () => {
    setListName();
    handleClose();
  }
  const createList = e => {
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
            helperText={nameError}
          />
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={e=>createList(e)}
          disabled={createDisabled}
            color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default CreateListDialog;