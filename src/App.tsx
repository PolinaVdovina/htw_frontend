import React, { useEffect } from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, Divider, Backdrop, CircularProgress, Paper, useTheme } from '@material-ui/core';
import { AppFooter } from './components/app-footer/AppFooter';
import { RootState } from './redux/store';
import { useDispatch, connect } from 'react-redux';
import { AppMenuList } from './components/app-menu/AppMenuList';
import { RedirectIfNotAuthorized } from './components/redirects/RedirectIfNotAuthorized';
import { HCenterizingGrid } from './pages/grid-containers/HCenterizingGrid';
import Notifier from './components/notistack/Notifier';
// import { isValidTokenFetch } from './utils/fetchFunctions';
// import { startLoadingAction, stopLoadingAction } from './redux/actions/dialog-actions';
import { reloadAuthData } from './redux/reducers/auth-reducers';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridVerticalContainer: {
      width: "100%",

      minHeight: "100vh",
      alignItems:"center",
      backgroundColor: "#edeef0",

    },
    content: {
      flexGrow: 1,
      maxWidth: theme.container.maxWidth,
      padding:theme.spacing(2), 
      [theme.breakpoints.down('xs')]: {
        paddingLeft:theme.spacing(0), 
        paddingRight:theme.spacing(0), 
      },
      flexWrap:"nowrap",
      alignContent: "center",
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
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
      [theme.breakpoints.down('xs')]: {
        display: "none",
      },
      //position: "fixed",
    },
    fakeAppMenuPaper: {
      position:"absolute",
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
  startLoading: () => void,
  authorized: boolean,
  isPersonalDataFetched: boolean,
  reloadAuthData: typeof reloadAuthData
}

function mapStateToProps(state : RootState) {
  return {
    isLoading: state.dialogReducer.isLoading,
    authorized: state.authReducer.loggedIn==true,
    isPersonalDataFetched: state.userPersonalsReducer.isFetched,
  }
}

const mapDispatchToProps = {
    reloadAuthData: reloadAuthData,
}

function App(props: IAppProps) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    props.reloadAuthData(); 
  },[])
  

  //props.startLoading();
  return (
      <div>
        <Notifier/>
        <Backdrop className={classes.backdrop} open={props.isLoading}>
          <CircularProgress/>
        </Backdrop>
        
        <Grid className={classes.gridVerticalContainer} container direction="column">
          <Grid item className = {classes.fakeMenuBar}/>
          
          <Grid className={classes.content} container item direction="row" >
            <BrowserRouter>
              <AppMenu title="How To Work"/>
              {
                //<div className = {classes.fakeAppMenuPaper}/>
              props.authorized && props.isPersonalDataFetched && <>
                
                <Paper className={classes.appMenuPaper}>
                  <AppMenuList/>
                </Paper>
              </>
              }
              <Routes/>
              <RedirectIfNotAuthorized/> 
            </BrowserRouter>

          </Grid>
          <Divider/>
          <AppFooter/>
        </Grid>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
