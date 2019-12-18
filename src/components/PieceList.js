import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import { usePieceStore } from "../usePieceStore";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),

    overflowX: "auto"
  }
}));

const PieceList = observer(() => {
  const pieceStore = usePieceStore();
  const classes = useStyles();

  const deletePiece = (e, id) => {
    pieceStore.delete(e);
  };

  return (
    <div>
      <Paper className={classes.root}>
        {pieceStore.pieces.length > 0 && (
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
