import React, { useEffect } from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter } from 'react-router-dom';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, Divider, Backdrop, CircularProgress, Paper, useTheme, IconButton, useMediaQuery } from '@material-ui/core';
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
import MenuIcon from '@material-ui/icons/Menu';
import { AppDrawer } from './components/app-menu/AppDrawer';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
//import { startWebsocketConnection, getWebSocket } from './websockets/common';
import { showChat, hideChat, } from './redux/reducers/chat-reducers';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import { ChatDialog } from './components/dialogs/ChatDialog';
import { stopWebsocketConnection } from './websockets/common';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridVerticalContainer: {
      width: "100%",
      minHeight: "100vh",
      alignItems: "center",
      backgroundColor: "#edeef0",

    },
    content: {
      flexGrow: 1,
      maxWidth: theme.container.maxWidth,
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
      },
      flexWrap: "nowrap",
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
      height: "min-content",
      overflow: "hidden",
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
      [theme.breakpoints.down('xs')]: {
        display: "none",
      },
      //position: "fixed",
    },
    fakeAppMenuPaper: {
      position: "absolute",
      marginRight: theme.spacing(2),
      height: "min-content",
      overflow: "hidden",
      width: theme.menuBar.menuWidth,
      flexGrow: 1,
      [theme.breakpoints.down('xs')]: {
        display: "none",
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "none",
      [theme.breakpoints.down('xs')]: {
        display: "block",
      }
    },
  }),
);


interface IAppProps {
  isLoading: boolean,
  startLoading: () => void,
  authCompleteStatus?: boolean | null,
  isPersonalDataFetched: boolean,
  reloadAuthData: typeof reloadAuthData,
  showChat: typeof showChat,
  hideChat: typeof hideChat,
  token?: string | null,
  isChatOpen: boolean,
  newNotifications: number,
}

function mapStateToProps(state: RootState) {
  return {
    isLoading: state.dialogReducer.isLoading,
    authCompleteStatus: state.authReducer.authCompleteStatus,
    isPersonalDataFetched: state.userPersonalsReducer.isFetched,
    token: state.authReducer.token,
    isChatOpen: state.chatReducer.isOpen,
    newNotifications: state.notificationReducer.newNotifications,
  }
}

const mapDispatchToProps = {
  reloadAuthData: reloadAuthData,
  showChat: showChat,
  hideChat: hideChat,
}

function App(props: IAppProps) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const setupListeners = () => {
    window.addEventListener("beforeunload", async(ev) => {
      await stopWebsocketConnection();
      ev.preventDefault();
      
      return async() => {

        await stopWebsocketConnection();
      };
    });
  };

  

  /*   const webSocket = React.useRef<WebSocket | null>(null);
    const stompClient = React.useRef<Stomp.Client | null>(null); */

  useEffect(() => {
  
    props.reloadAuthData();
  }, [])

  useEffect(() => {
    setMenuOpen(false);
  }, [props.authCompleteStatus])


  //const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  //props.startLoading();
  return (
    <div>
      <Notifier />
      <Backdrop
        style={{ zIndex: 100000 }}
        className={classes.backdrop} open={props.isLoading || props.authCompleteStatus == null}
      >
        <CircularProgress style={{ zIndex: 100000 }} />
      </Backdrop>

      {
        props.authCompleteStatus != null &&
        <>
          <ChatDialog
            onClose={props.hideChat}
            open={props.isChatOpen}
          />

          <Grid className={classes.gridVerticalContainer} container direction="column">
            <Grid item className={classes.fakeMenuBar} />

            <Grid className={classes.content} container item direction="row" >
              <BrowserRouter>
                {
                  props.authCompleteStatus &&
                  <AppDrawer
                    onClose={(event) => setMenuOpen(false)}
                    open={isMenuOpen} />
                }
                <AppMenu
                  leftAppartment={props.authCompleteStatus && (
                    <IconButton
                      key={1}
                      onClick={(event) => setMenuOpen(true)} className={classes.menuButton}
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                  rightAppartment={props.authCompleteStatus && props.isPersonalDataFetched &&
                    <IconButton key={2} color="inherit">
                      <Badge badgeContent={props.newNotifications} color={"error"}>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  }
                  title="How To Work" />
                {
                  //<div className = {classes.fakeAppMenuPaper}/>
                  props.authCompleteStatus &&
                  <Paper className={classes.appMenuPaper}>
                    <AppMenuList />
                  </Paper>
                }
                <Routes />
                <RedirectIfNotAuthorized />
              </BrowserRouter>

            </Grid>
            {/* <Divider /> */}
            {/* <AppFooter/> */}
          </Grid>
        </>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
