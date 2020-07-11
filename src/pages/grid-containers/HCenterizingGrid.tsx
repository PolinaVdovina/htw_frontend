import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/SignInCard/RegRoleCard';

interface IHCenterizingGridProps {
    children: React.ReactNode,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "20px",
      textAlign: "center",
      justifyContent: "center",
      flex: 1,
      maxWidth: 1280,
     
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