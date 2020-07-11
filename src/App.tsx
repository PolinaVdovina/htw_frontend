import React from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppBar } from './components/app-menu/AppBar';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { AppFooter } from './components/app-footer/AppFooter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridVerticalContainer: {
      width: "100%",
      minHeight: "100vh",

      //justifyContent:"center" 
    },
    content: {
      flexGrow: 1,
     
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
          <div className={classes.fakeMenuBar}/>
          <Grid container className={classes.content}>
            {
              <BrowserRouter>
                <Routes/>
              </BrowserRouter>
            }
          </Grid>
          <AppFooter/>
        </Grid>
      </div>
  );
}

export default App;
