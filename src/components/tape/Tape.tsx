import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, useTheme, Divider } from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { IPostData, PostCard, IPostProps } from './posts/PostCard';
import { CabinetContext } from './../cabinet/cabinet-context';

interface ITapeProps {
  posts?: Array<IPostData> | null,
  onDeleteClick?: (id:any) => void,
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
            props.posts && props.posts.map( (postData, index) =>
              <><PostCard onDeleteClick={props.onDeleteClick} key={"a"+index} postData={postData} style={{padding: theme.spacing(2)}}/> <Divider key={"b"+index}/> </> 
            )
          }
        </Grid>
    )
}