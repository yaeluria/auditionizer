import React from 'react';
import SignOutButton from './SignOutButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
  }));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="default">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.toolbarTitle}>
          <Typography variant="h6" color="inherit" noWrap>
            AUDITIONIZER
          </Typography>
        </Box>
        <SignOutButton />
      </Toolbar>
    </AppBar>
  );
}