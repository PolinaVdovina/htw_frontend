import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, useTheme, Divider } from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { IPostData, PostCard } from './posts/PostCard';

interface ITapeProps {
  posts?: Array<IPostData>
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
  }),
);



export const Tape = (props: ITapeProps) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid  container direction="column">
          {
            props.posts && props.posts.map( postData =>
              <><PostCard postData={postData} style={{padding: theme.spacing(2)}}/> <Divider/> </> 
            )
          }
        </Grid>
    )
}