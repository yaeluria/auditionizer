import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import {usePieceStore} from '../usePieceStore';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const SelectDialog = observer(() => { 

  const [open, setOpen] = React.useState(false);
  const pieceStore = usePieceStore();
  const classes = useStyles();
  
  
  const handleClose = () => {
    setOpen(false);
  };

  const pickNext = () => {
    pieceStore.select();
  }

  const handlePick = () => {
    if(pieceStore.pieces.length > 0){
      setOpen(true);
      pieceStore.select();
    }
  
    }


  return (
    <div>
    <Button
    disabled= {pieceStore.pieces.length <= 0}
    onClick = {handlePick}
    fullWidth
    variant="contained"
    color="primary"
    size="large"
    className={classes.submit}
  >
    What should I play?
  </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Play"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {pieceStore.selectedOption ? pieceStore.selectedOption.text : "no more pieces to select"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={pickNext} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
export default SelectDialog;