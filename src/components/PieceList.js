import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import { usePieceStore } from "../usePieceStore";
import { useAuthStore } from '../useAuthStore';
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
  const AuthStore = useAuthStore();
  const pieceStore = usePieceStore();
  const classes = useStyles();
  const userId = AuthStore.loggedIn ? AuthStore.user.uid : null; 
  const deletePiece = (e, id) => {
    pieceStore.delete(e);
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
      console.log("FireB ",snapshot.exists())
      console.log("snapshot recieved");
      if (snapshot && snapshot.exists()) {
         console.log(snapshot.val());
         const user = snapshot.val();
         if (user && user.lists){
           pieceStore.lists = user.lists;
         }
         else{
           pieceStore.lists = {}
         }
      }})
}
  }
,[userId, pieceStore.lists])
  const currentListId = (pieceStore.currentList && pieceStore.currentList.id) || null;
  const pieces = (pieceStore.lists && pieceStore.lists[currentListId]) || pieceStore.pieces;

  useEffect(() => {
    localStorage.setItem('pieces', JSON.stringify(pieceStore.pieces));
    console.log("pieceStore currentList", pieceStore.currentList);
    console.log("currentListId",currentListId);

    if(AuthStore.loggedIn && currentListId){
     
      const userId = AuthStore.user.uid;
      const updates = {};
      updates['users/' + userId  + '/lists/' + currentListId + '/pieces'] = pieceStore.pieces.slice();
      firebase.database().ref().update(updates);

    }

  },[AuthStore.loggedIn, AuthStore.user.uid, currentListId, pieceStore.currentList, pieceStore.pieces])
  

  return (
    <div>
      <Paper className={classes.root}>
        { pieces.length > 0 && (
          <List>
            {pieceStore.pieces.map((piece, i, arr) => {
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
