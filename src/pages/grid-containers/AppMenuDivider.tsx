import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid, Paper } from '@material-ui/core';
import { AppMenuList } from '../../components/app-menu/AppMenuList';


interface IAppMenuDividerProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appMenuPaper: {
        marginRight: theme.spacing(2),
        height:"min-content",
        overflow: "hidden",
  
        [theme.breakpoints.down('xs')]: {
          display: "none",
        }
    },
    content: {
        flex:1,
    },
    root: {
      flexWrap:"nowrap",
      justifyContent: "center",
      flex: 1,
      
    },
  }),
);

export const AppMenuDivider = (props : IAppMenuDividerProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            <Paper className={classes.appMenuPaper}>
                <AppMenuList/>
            </Paper>
            <Grid item className={classes.content}>
                {props.children}
            </Grid>
            
        </Grid>
    )
}