import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { AppMenuDivider } from './AppMenuDivider';


interface IHCenterizingGridProps {
    children: React.ReactNode,
    fullHeight?: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

      justifyContent: "center",
      
    },
  }),
);

export const HCenterizingGrid = (props : IHCenterizingGridProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root} style={{height: props.fullHeight ? "auto": "min-content"}}>
            {props.children}
        </Grid>
    )
}