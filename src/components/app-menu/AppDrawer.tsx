import * as React from 'react';
import { Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { AppMenuList } from './AppMenuList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },
    rootGrid: {
      alignItems: 'center',
      width: "224px"
    },

    avatarGrid: {
      padding: "12px",
      backgroundColor: theme.palette.primary.main,
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

interface IAppDrawerProps {
    open?: boolean,
    onClose?: (event) => void
}



export const AppDrawer = (props: IAppDrawerProps) => {
    const classes = useStyles();
    return (
        <Drawer  open={props.open} onClose={props.onClose}>
          <AppMenuList/>
        </Drawer>
    )
}