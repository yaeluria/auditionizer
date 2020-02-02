import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import { useAppStore } from "../useAppStore";
import { observer } from "mobx-react-lite";
import firebase from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),

    overflowX: "auto"
  }
}));

const PieceList = observer(() => {
  const AppStore = useAppStore();
  const classes = useStyles();
  const userId = AppStore.loggedIn ? AppStore.user.uid : null; 
  const deletePiece = (e, id) => {
    AppStore.delete(e);
  };

  useEffect(()=>{
  console.log("component mount", userId);
  if(userId){
    firebase
    .database()
    .ref(
      'users/' + userId 
    )
    .on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
         const user = snapshot.val();
         if (user && user.lists){
           AppStore.lists = {...user.lists};
         }
         else{
           AppStore.lists = {}
         }
      }})
}
  }
,[])
  const userUid = AppStore.user && AppStore.user.uid
  const currentListId =  AppStore.currentListId || null;
  const pieces = (AppStore.lists && currentListId) ? (AppStore.lists[currentListId]).pieces : AppStore.pieces;
  useEffect(() => {
    localStorage.setItem('pieces', JSON.stringify(pieces));
    if(AppStore.loggedIn && currentListId){
      const userId = AppStore.user.uid;
      const updates = {};
      updates['users/' + userId  + '/lists/' + currentListId + '/pieces'] = AppStore.pieces.slice(); //this maybe wrong?
      firebase.database().ref().update(updates);

    }

  },[AppStore.loggedIn, userUid, currentListId, AppStore.currentList, AppStore.pieces])
  

  return (
    <div>
      <Paper className={classes.root}>
        { pieces.length > 0 && (
          <List>
            {pieces.map((piece, i, arr) => {
              const lastItem = arr.length - 1 === i;

              return (
                <ListItem
                  key={piece.id}
                  data-id={piece.id}
                  divider={!lastItem}
                >
                  <ListItemText>{piece.text}</ListItemText>
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="delete"  onClick={e => {
                      deletePiece(piece, e);
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
    </div>
  );
});
export default PieceList;
