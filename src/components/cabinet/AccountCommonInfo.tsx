import * as React from 'react';
import { Link, Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChangeComponent } from './ChangeComponent';
import { ChangeComponentDialog } from './ChangeComponentDialog';

interface IDrawerElement {
  IconComponent?: any,
  title?: string,
  url?: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      alignItems: 'center',
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },

    avatarGrid: {
      flexWrap:"nowrap"
      //backgroundColor: theme.palette.primary.main
    },

    avatar: {
      width: "64px",
      height: "64px",
      marginRight:theme.spacing(2)
    },
    descriptionAndTitleBlock: {
      flexGrow:1
    },
    titleBlock: {
        width:"max-content"
    },
    descriptionBlock: {
        fontSize:"12px", 
        width:"max-content"
    }
  }),
);

interface IAccountCommonInfo {
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

const AccountCommonInfoComp = (props: IAccountCommonInfo) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    return (
            <Grid container alignItems="center" direction="row" className={classes.avatarGrid}>
                <Avatar className={classes.avatar} />
                <Grid item container direction="column" className={classes.descriptionAndTitleBlock}>
                    <Typography className={classes.titleBlock}>
                    {(props.name && props.surname) ? props.name + ' ' + props.surname : props.login}
                    </Typography>
                    <Typography className={classes.descriptionBlock}>
                    Здесь написано обо мне, дя
                    </Typography>

                    <ChangeComponentDialog 
                      open={open}
                      handleClickClose={() => {setOpen(false)}}
                      handleClickSave={() => {setOpen(false)}}
                      type="name"
                      role="INDIVIDUAL"
                      />
                    
                </Grid>
                <Grid item>
                    <Link 
                        component='button'  
                        onClick={()=>setOpen(true)}
                    >
                        Изменить
                    </Link>
                </Grid>
            </Grid>
    )
}

export const AccountCommonInfo = connect(mapStateToProps )(AccountCommonInfoComp);