import * as React from 'react';
import { Link, Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme, Dialog } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChangeComponent, IChangeComponent } from './ChangeComponent';




interface IChangeComponentDialog {
    open: boolean,
}


export const ChangeComponentDialog = (props: IChangeComponentDialog) => {
    //const classes = useStyles();
    const theme = useTheme();
    const {
        open,
        ...other
    } = props

    //const changeComponentProps: IChangeComponent = {
    //    
    //};

    return (
            <Dialog open={props.open}>
                {//<ChangeComponent {...other}/>
                }
            </Dialog>
    )
}

