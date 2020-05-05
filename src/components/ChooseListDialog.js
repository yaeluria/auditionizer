import React from 'react';
import { observer } from 'mobx-react-lite';
import {toJS} from 'mobx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from '@material-ui/core/Paper';

import {useAppStore} from '../useAppStore';
import { makeStyles } from "@material-ui/core/styles";


const ChooseListDialog = observer(() => { 
const [open, setOpen] = React.useState(false);
const AppStore = useAppStore();
  
  
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
  
      overflowX: "auto"
    }
  }));
const handleClose = () => {
    setOpen(false);
  };


const classes = useStyles();

const chooseList = e => {
    AppStore.choose(e);
    handleClose();
 } 
const deleteList = e => {
  console.log(toJS(AppStore.currentListId), "before delete")
  AppStore.deleteList(e);
}
 
const listsObject = toJS(AppStore.lists);

for (const listId in listsObject) {
    listsObject[listId].id = listId;
  }
const AllLists = listsObject && Object.values(listsObject);
// the lists, excluding list currently showing and in reverse order to show latest added first.
const lists = (AllLists.filter(list => list.id !== AppStore.currentListId)).reverse();

const handleOpen = () => {
      setOpen(true);
  }

  return (
    <div>
    <Button
    onClick = {handleOpen}
    size="medium"
  >

    choose from my lists
  </Button>
 
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="create-list-title">
        <DialogTitle id="choose-list-title">Choose a list from your lists</DialogTitle>
        <Paper className={classes.root}>
        { lists && lists.length > 0 && (
          <List>
            {lists.map((list, i, arr) => {
              const lastItem = arr.length - 1 === i;

              return (
                <ListItem
                  button
                  key={list.id}
                  data-id={list.id}
                  divider={!lastItem}
                  
                >
                  <ListItemText onClick={(e) => chooseList(list.id, e)}>{list.name}</ListItemText>
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="delete" onClick={e => {
                      deleteList(list.id, e);
                    }}>
                      <DeleteIcon
                      />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
      </Dialog>
    </div>
  );
})
export default ChooseListDialog;