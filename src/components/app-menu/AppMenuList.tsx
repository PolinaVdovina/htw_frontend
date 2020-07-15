import * as React from 'react';
import { Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';

const drawerElementsDict = [
    {
      IconComponent: LibraryBooksIcon,
      title: "Новости",
      url: urls.home,
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
  ]



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      alignItems: 'center',
      width: theme.menuBar.menuWidth
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
  const classes = useStyles();
    return ( 
        <List className={classes.listButtons}>
        {
          drawerElementsDict.map(el => 
              <ListItem button>
                  <ListItemIcon>
                      <el.IconComponent/>
                  </ListItemIcon>
                  <ListItemText primary={el.title}/>
              </ListItem>)
        }
        </List>
    )
}

interface IAppMenuList {
    open?: boolean,
    onClose?: (event) => void
}


export const AppMenuList = (props: IAppMenuList) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid container direction="column" className={classes.rootGrid}>
            <Grid container item direction="row" className={classes.avatarGrid}>

                <Avatar className={classes.avatar} style={{marginRight:theme.spacing(2)}}/>
        
                <Typography style={{flexGrow:1, width:"min-content", color:"white"}}>
                  Александр Галков
                </Typography>
        
            </Grid>
            <Grid item container className={classes.listButtonsGrid}>
                <DrawerListButtons/>
            </Grid>
        </Grid>
    )
}