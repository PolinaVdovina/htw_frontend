import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/SignInCard/RegRoleCard';

interface IVHCenterizingGridProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      alignContent:"center",
      justifyContent: "center",
      flexGrow:1,
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