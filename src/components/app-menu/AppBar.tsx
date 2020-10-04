import * as React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, makeStyles, Theme, createStyles, Icon, Tooltip, InputBase, fade, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AppMenuContext } from './AppMenuContext';

import AccountCircleIcon from '@material-ui/icons/AccountCircle'; //профиль 
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'; //новости 
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'; //рекомендации 
import NotificationsIcon from '@material-ui/icons/Notifications'; //уведомления 
import SearchIcon from '@material-ui/icons/Search'; //поиск 
import { urls } from '../../pages/urls';
import { relative } from 'path';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';




export const appBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      
    },
    container: {
      padding:0,
      maxWidth:theme.container.maxWidth,
    },
    menuBar: {
      minHeight: theme.menuBar.height,

      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "none",
      [theme.breakpoints.down('xs')]: {
        display: "block",
      }
    },
    title: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      whiteSpace: "nowrap"
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: 'auto',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }),
);

function mapStateToProps(state : RootState) {
  return {
    //authorized: state.authReducer.loggedIn,
  }
}


interface IAppBarProps {
    title?: String,
    onMenuButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    height?: number,
    //authorized: boolean,
    leftAppartment?: any,
    rightAppartment?: any,
}

export const AppBarComp = (props : IAppBarProps) => {
    const classes = appBarStyles();
    const context = React.useContext(AppMenuContext);
    return (
        <MuiAppBar  position="fixed" className={classes.root}>
          <Container className={classes.container}>
            <Toolbar className={classes.menuBar}>
                {
                  props.leftAppartment
                }
                <Typography variant="h6" className={classes.title}>
                    {context?.title}
                </Typography>

                {/* {
                props.authorized &&
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Поиск…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                } */}
                {
                  props.rightAppartment
                }
            </Toolbar>
            </Container>
        </MuiAppBar>
    )
}

export const AppBar = connect(mapStateToProps)(AppBarComp)