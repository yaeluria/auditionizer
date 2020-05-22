import React, { useState } from 'react';
import {toJS} from 'mobx';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
   setNameError("");
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
      setNameError("");
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
        <DialogTitle id="create-list-title">Add a new list of audition pieces</DialogTitle>
        <DialogContent>
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
          //todo - is "e" ncessary? 
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