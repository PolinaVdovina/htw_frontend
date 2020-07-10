import * as React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, makeStyles, Theme, createStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { MenuContext } from './AppMenuContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface IAppBarProps {
    title?: String,
    onDrawerShow?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export const AppBar = (props : IAppBarProps) => {
    const classes = useStyles();
    const context = React.useContext(MenuContext);
    return (
        <MuiAppBar>
            <Toolbar>
                <IconButton onClick={props.onDrawerShow} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    {context?.title}
                </Typography>
            </Toolbar>
        </MuiAppBar>
    )
}