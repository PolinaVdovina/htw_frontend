import React from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import { AppFooter } from './components/app-footer/AppFooter';
import { RootState } from './redux/store';
import { useDispatch, connect } from 'react-redux';



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
    backdrop: {
      zIndex: 10000000,
    }
  }),
);


interface IAppProps {
  isLoading: boolean, 
}

function mapStateToProps(state : RootState): IAppProps {
  return {
    isLoading: state.dialogReducer.isLoading
  }
}

function App(props: IAppProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //dispatch( startLoading() );
  return (
      <div>
        <Backdrop className={classes.backdrop} open={props.isLoading}>
          <CircularProgress/>
        </Backdrop>
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

export default connect(mapStateToProps)(App);
