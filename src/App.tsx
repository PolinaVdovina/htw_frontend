import React, { useEffect } from 'react';

import './App.css';
import { Routes } from './pages/Routes';
import { BrowserRouter, Redirect, NavLink, Link as RouterLink } from 'react-router-dom';
import { AppMenu } from './components/app-menu/AppMenu';
import { Grid, makeStyles, createStyles, Theme, Divider, Backdrop, CircularProgress, Paper, useTheme, IconButton, useMediaQuery, SvgIcon, Icon, Typography } from '@material-ui/core';
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
import { showChat, hideChat, getUnreadMessagesCount } from './redux/reducers/chat-reducers';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import { ChatDialog } from './components/dialogs/ChatDialog';
import { stopWebsocketConnection } from './websockets/common';
import useSound from 'use-sound';
import { Button } from '@material-ui/core';
import { urls } from './pages/urls';
import { countNewNotifications } from './redux/reducers/notification-reducers';
import Logo from "./logo.svg"
const sound = require('./notification.mp3')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridVerticalContainer: {
      width: "100%",
      minHeight: "100vh",
      alignItems: "center",
      backgroundColor: "#edeef0",
      minWidth: "320px"

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
      marginRight: theme.spacing(1),
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
  unreadMessages: number,
  login?: string | null,
}

function mapStateToProps(state: RootState) {

  return {
    login: state.authReducer.login,
    isLoading: state.dialogReducer.isLoading,
    authCompleteStatus: state.authReducer.authCompleteStatus,
    isPersonalDataFetched: state.userPersonalsReducer.isFetched,
    token: state.authReducer.token,
    isChatOpen: state.chatReducer.isOpen,
    newNotifications: countNewNotifications(state.notificationReducer.notifications, state.notificationReducer.notificationWatchLastDate).length,
    unreadMessages: state.chatReducer.chats ? getUnreadMessagesCount(state.chatReducer.chats) : 0
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

  const [prevUnreadMessage, setPrevUnreadMessage] = React.useState(props.unreadMessages);


  const setupListeners = () => {
    window.addEventListener("beforeunload", async (ev) => {
      await stopWebsocketConnection();
      ev.preventDefault();

      return async () => {

        await stopWebsocketConnection();
      };
    });
  };

  const [play] = useSound(sound);
  useEffect(() => {
    props.reloadAuthData();

  }, [])


  useEffect(() => {

    setPrevUnreadMessage(props.unreadMessages);
  }, [(prevUnreadMessage < props.unreadMessages) && props.unreadMessages])

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
            key={1}
            onClose={props.hideChat}
            open={props.isChatOpen}
          />

          <Grid key={2} className={classes.gridVerticalContainer} container direction="column">
            <Grid item className={classes.fakeMenuBar} />

            <Grid className={classes.content} container item direction="row" >
              <BrowserRouter>


                {
                  props.authCompleteStatus &&
                  <>

                    <AppDrawer
                      onClose={(event) => setMenuOpen(false)}
                      open={isMenuOpen} />
                  </>
                }
                <AppMenu
                  leftAppartment={
                    <>
                      {props.authCompleteStatus && (
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
                      <Icon 
                        component={RouterLink}
                        to={"/"}
                        style={{ height: 46, width: 46, marginRight: theme.spacing(1), borderRadius: "100%", backgroundColor: "white", display: "flex" }}
                      >
                            <img src={Logo} style={{width:"inherit"}}/>
                      </Icon>
                      <Typography 
                      variant="h6" 
                      component={NavLink} to={"/"}
                      style={{textDecoration: 'none', color: "white"}}
                      >
                        How To Work
                      </Typography>
              
                    </>
                  }
                  rightAppartment={props.authCompleteStatus && props.isPersonalDataFetched &&
                    <IconButton
                      component={NavLink}
                      to={urls.notifications.shortPath}
                      key={2}
                      color="inherit"
                    >
                      <Badge
                        badgeContent={props.newNotifications} color={"error"}
                      >
                        <NotificationsIcon style={{ color: "white" }} />
                      </Badge>
                    </IconButton>
                  }
                  />
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
