import React from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppBar } from './components/app-menu/AppBar';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, MuiThemeProvider, Divider } from '@material-ui/core';
import { theme } from './theme';
import { AppFooter } from './components/app-footer/AppFooter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridVerticalContainer: {
      width: "100%",
      minHeight: "100vh",
      alignItems:"center",
      backgroundColor: "#edeef0"
    },
    content: {
      flexGrow: 1,
      backgroundColor: "#edeef0"
    },
    fakeMenuBar: {
      height: theme.menuBar.height
    },
  }),
);

function App() {
  const classes = useStyles();
  return (
    
      <div>
        <AppMenu title="How To Work"/>
        <Grid className={classes.gridVerticalContainer} container direction="column">
          <Grid item className = {classes.fakeMenuBar}/>
          
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
          <Divider/>
          <AppFooter/>
        </Grid>
      </div>
  );
}

export default App;
