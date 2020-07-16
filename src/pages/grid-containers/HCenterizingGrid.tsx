import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';


interface IHCenterizingGridProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

      justifyContent: "center",
      flex: 1,
      height: "min-content"
    },
  }),
);

export const HCenterizingGrid = (props : IHCenterizingGridProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            {props.children}
        </Grid>
    )
}