import React, { useState } from 'react';
import {toJS} from 'mobx';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useAppStore } from '../useAppStore';


const CreateList = observer(() => {
  const [listName, setListName] = useState();
  const [createDisabled, setCreateDisabled] = useState(true);
  const [nameError, setNameError] = useState();

  const AppStore = useAppStore();
  

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
    //resetting the name to blank
    setListName();
  }
  const createList = e => {
    AppStore.createList(listName, afterList);
  }
  return (
    <Box height="inherit" display="flex" flexDirection="column" alignContent="spaceEvenly">
        <Typography component="div">
            <Box lineHeight='1.60' >
            Create a list of your audition pieces.
            Give this list a title (e.g. Berlin Philharmonic Audition December 2020).
            </Box>
            </Typography>  
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="text"
            onChange={setName}
            helperText={nameError}
            />
            <Button 
            onClick={e=>createList(e)}
            disabled={createDisabled}
            color="primary">
            create
            </Button>
    </Box>
        
  );
})
export default CreateList;