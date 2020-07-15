import React from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, Divider, Backdrop, CircularProgress, Paper, useTheme } from '@material-ui/core';
import { AppFooter } from './components/app-footer/AppFooter';
import { RootState } from './redux/store';
import { useDispatch, connect } from 'react-redux';
import { stopLoading } from './redux/actions/dialog-actions';
import { startLoading } from './redux/reducers/dialog-reducers';
import { AppMenuList } from './components/app-menu/AppMenuList';

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
      maxWidth: theme.container.maxWidth,
      //padding: theme.spacing(2),
    },
    fakeMenuBar: {
      height: theme.menuBar.height
    },
    backdrop: {
      zIndex: 10000000,
    },
    appMenuPaper: {
      marginRight: theme.spacing(2),
      height:"min-content",
      overflow: "hidden",

      [theme.breakpoints.down('xs')]: {
        display: "none",
      }
    },
    fakeAppMenuPaper: {
      position:"relative",
      marginRight: theme.spacing(2),
      height:"min-content",
      overflow: "hidden",
      width: theme.menuBar.menuWidth,
      flexGrow:1,
      [theme.breakpoints.down('xs')]: {
        display: "none",
      }
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

interface IAppDispatchProps {
  startLoading: () => void
}

const mapDispatchToProps = {
    startLoading: startLoading
}

function App(props: IAppProps & IAppDispatchProps) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  //dispatch( startLoading() );
  //dispatch( stopLoading() );
  props.startLoading();
  return (
      <div>
        <Backdrop className={classes.backdrop} open={props.isLoading}>
          <CircularProgress/>
        </Backdrop>
        <AppMenu title="How To Work"/>
        <Grid className={classes.gridVerticalContainer} container direction="column">
          <Grid item className = {classes.fakeMenuBar}/>
          <Grid className={classes.content} container item direction="row" style={{padding:theme.spacing(2), flexWrap:"nowrap"}} >

            <Paper className={classes.appMenuPaper}>
              <AppMenuList/>
            </Paper>
            <BrowserRouter>
              <Routes/>
            </BrowserRouter>
          </Grid>
          <Divider/>
          <AppFooter/>
        </Grid>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
