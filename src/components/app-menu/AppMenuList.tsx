import * as React from 'react';
import { Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/reducers/auth-reducers';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
interface IDrawerElement {
  IconComponent?: any,
  title?: string,
  url?: string,
  func?: (...arg) => void,
}

const drawerElementsDict: Array<IDrawerElement> = [
    {
      IconComponent: AccountCircleIcon,
      title: "Личный кабинет",
      url: urls.cabinet.shortPath+"1",
    },
    {
      IconComponent: LibraryBooksIcon,
      title: "Новости",
      url: urls.home.shortPath,
    },
    {
      IconComponent: PlaylistAddCheckIcon,
      title: "Рекомендации",
      url: "/"
    },
    {
      IconComponent: NotificationsIcon,
      title: "Уведомления",
      url: "/"
    },
    {
      IconComponent: ChatIcon,
      title: "Сообщения",
      url: "/"
    },
    {
      IconComponent: TransitEnterexitIcon,
      title: "Выйти",
      func: async(dispatch) => {await dispatch(logout)(dispatch)}
    },
  ]



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      alignItems: 'center',
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },

    avatarGrid: {
      padding: "12px",
      backgroundColor: theme.palette.primary.main
    },

    avatar: {
      width: "64px",
      height: "64px"
    },

    listButtonsGrid: {
      width:"100%",
    },
    listButtons: {
      width:"100%",
    }
  }),
);

const DrawerListButtons = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
    return ( 
        <List className={classes.listButtons}>
        {
          drawerElementsDict.map(el => 
              <>
              <ListItem button {...{component:el.url&&NavLink, to:el.url || null}} onClick={()=>{el.func && el.func(dispatch)}}>
                  <ListItemIcon>
                      <el.IconComponent/>
                  </ListItemIcon>
                  <ListItemText primary={el.title}/>
              </ListItem>
              </>
          )
        }
        </List>
    )
}

interface IAppMenuList {
    open?: boolean,
    onClose?: (event) => void,
    name: string,
    surname: string,
    login?: string | null,
}

function mapStateToProps(state : RootState) {
  return {
    name: state.userPersonalsReducer.name,
    surname: state.userPersonalsReducer.surname,
    login: state.authReducer.login,
    token: state.authReducer.token,
  }
}

const AppMenuListComp = (props: IAppMenuList) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container direction="column" className={classes.rootGrid}>
            <Grid container item alignItems="center" direction="row" className={classes.avatarGrid}>

                <Avatar 
                className={classes.avatar}
                component={NavLink} to={urls.cabinet.shortPath+"1"}
                style={{marginRight:theme.spacing(2)}}/>
        
                <Typography style={{flexGrow:1, width:"min-content", color:"white"}}>
                  {(props.name && props.surname) ? props.name + ' ' + props.surname : props.login}
                </Typography>
        
            </Grid>
            <Grid item container className={classes.listButtonsGrid}>
                <DrawerListButtons/>
            </Grid>
        </Grid>
    )
}

export const AppMenuList = connect(mapStateToProps )(AppMenuListComp );