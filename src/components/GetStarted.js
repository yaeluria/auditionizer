import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CreateList from './CreateList';
import music from '../assets/music.svg'; 

const useStyles = makeStyles(() => ({
    root: {
        height: 'inherit',
        paddingTop: '36px',
       
    },
    illustration: {
      height: '25vh',
      marginBottom: '36px'
    }
    
  }));

  export default function GetStarted() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Container component="main" className={classes.main} maxWidth="sm" >
        <img className={classes.illustration} src={music} alt="Music illustration" /> 
        <Box>
          <Typography variant="h4"  component="h1" gutterBottom>
            <Box fontWeight={600}  fontFamily="Open Sans" >
              Get ready for your next Audition
            </Box>
          </Typography>
          <CreateList />
        </Box>
        </Container>
      </div>
    );
  }