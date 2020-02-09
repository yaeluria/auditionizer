import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {toJS} from 'mobx';
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

  const userId = AppStore.loggedIn && AppStore.user ? AppStore.user.uid : null; 
  const deletePiece = (e, id) => {
    // AppStore.delete(e);
  };

  useEffect(()=>{
  console.log("component mount", userId);
  if(userId){
    const localCurrentListId = localStorage.getItem("currentListId")
    AppStore.currentListId = (AppStore.lists.hasOwnProperty(localCurrentListId) && localCurrentListId) || null ;

    console.log(AppStore.currentListId);
    if(!AppStore.currentListId){
      const listsRef = firebase.database().ref('users/' + userId+ '/lists');
      const refForKey = listsRef.push(
      {
        "name": "Piece List",
      }
    )

    const currentListId = refForKey.key;
    AppStore.currentListId  = currentListId;
    localStorage.setItem("currentListId", currentListId)
    }
    console.log(AppStore.currentListId);
    firebase
    .database()
    .ref(
      'users/' + userId 
    )
    .on("value", snapshot => {
      if (snapshot && snapshot.exists()) {
         const user = snapshot.val();
         if (user && user.lists){
           console.log({...user.lists});
           AppStore.lists = {...user.lists};
    
       const piecesObject = user.lists[currentListId] && toJS(user.lists[currentListId].pieces)
       AppStore.pieces = piecesObject ? Object.values(piecesObject) : [];
         }
         else{
           AppStore.lists = {}
         }
      }})
}
  }
,[userId])
  const currentListId =  AppStore.currentListId || null;
  
  const piecesObject = ((AppStore.lists && currentListId) ? (toJS(AppStore.lists[currentListId] || {}).pieces) : toJS(AppStore.pieces)) || [];
  console.log(piecesObject);

  // for (const pieceId in piecesObject) {
  //     piecesObject[pieceId].id = pieceId;
  //   }
  const pieces = piecesObject && Object.values(piecesObject);
  console.log(pieces);
  // useEffect(() => {
  //   localStorage.setItem('pieces', JSON.stringify(pieces));
  //   if(AppStore.loggedIn && currentListId){
  //     const userId = AppStore.user.uid;
  //     const updates = {};
  //     updates['users/' + userId  + '/lists/' + currentListId + '/pieces'] = AppStore.pieces.slice(); //this maybe wrong?
  //     firebase.database().ref().update(updates);

  //   }

  // },[AppStore.loggedIn, userUid, currentListId, AppStore.currentList, AppStore.pieces, AppStore.user.uid, pieces])
  

  return (
    <div>
      <Paper className={classes.root}>
        { pieces && pieces.length > 0 && (
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
