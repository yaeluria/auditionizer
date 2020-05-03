import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import CreateListDialog from './CreateListDialog'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
  }));

  export default function GetStarted() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Ready for your next Audition?
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Make it perfect. Add a list to get started
          </Typography>
          <CreateListDialog />
        </Container>
      </div>
    );
  }