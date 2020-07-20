import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { IPostData, PostCard } from './PostCard';

interface ITapeProps {
  posts?: Array<IPostData>
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "15px"
    },
  }),
);



export const Tape = (props: ITapeProps) => {
    const classes = useStyles();
    return (
        <Grid spacing={2} container direction="column">
          {
            props.posts && props.posts.map( postData =>
              <PostCard postData={postData}/> 
            )
          }
        </Grid>
    )
}