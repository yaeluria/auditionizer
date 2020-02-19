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

  const deletePiece = (e) => {
    console.log(piecesObject);
    AppStore.delete(e);

  };

  const currentListId =  AppStore.currentListId || null;
  // const piecesObject = ((AppStore.lists && currentListId) ? (toJS(AppStore.lists[currentListId] || {}).pieces) : toJS(AppStore.pieces)) || [];
  const piecesObject = (AppStore.lists && currentListId) && (toJS(AppStore.lists[currentListId] || {}).pieces);
  const pieces = piecesObject && Object.entries(piecesObject);
 
  

  return (
    <div>
      <Paper className={classes.root}>
        { pieces && pieces.length > 0 && (
          <List>
            {pieces.map((piece, i, arr) => {
              const lastItem = arr.length - 1 === i;

              return (
                <ListItem
                  key={piece[0]}
                  data-id={piece[1].id}
                  divider={!lastItem}
                >
                  <ListItemText>{piece[1].text}</ListItemText>
                  <ListItemIcon>
                    <IconButton edge="end" aria-label="delete" onClick={e => {
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
