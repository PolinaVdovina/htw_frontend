import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid, Paper } from '@material-ui/core';
import { AppMenuList } from '../../components/app-menu/AppMenuList';


interface IAppMenuDividerProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appMenuList: {
        marginRight: theme.spacing(2),
        height:"min-content",
        [theme.breakpoints.down('xs')]: {
          display: "none",
        }
    },
    content: {
        flexGrow:1,
    },
    root: {
      textAlign: "center",
      justifyContent: "center",
      flex: 1,
      
    },
  }),
);

export const AppMenuDivider = (props : IAppMenuDividerProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            <Grid item className={classes.appMenuList}>
                <Paper>
                    <AppMenuList/>
                </Paper>
            </Grid>
            <Grid item className={classes.content}>
                {props.children}
            </Grid>
            
        </Grid>
    )
}