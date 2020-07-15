import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';


interface IVHCenterizingGridProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignContent:"center",
      justifyContent: "center",
      flex:1,
    },
  }),
);

export const VHCenterizingGrid = (props : IVHCenterizingGridProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            {props.children}
        </Grid>
    )
}