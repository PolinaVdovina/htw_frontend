import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, Avatar} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';

interface IAvatarGridProps {
  AvatarComponent: React.ReactNode,
  topText: string,
  bottomText: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(1),
    },
  }),
);



export const AvatarGrid = (props: IAvatarGridProps) => {
    const classes = useStyles();
    return (
          <Grid container>
            <Avatar className={classes.avatar} />
          </Grid>
    )
}