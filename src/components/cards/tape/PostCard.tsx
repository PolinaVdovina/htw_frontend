import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { PaddingPaper } from '../PaddingPaper';




export interface IPostData {
  title?: string,
  body?: string,
  fileList?: FileList,
  createdAt?: Date,
  lastChange?: Date,
  owner?: string,    
}


interface IPostProps extends IPostData {
  postData: IPostData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "15px"
    },
  }),
);



export const PostCard = (props: IPostProps) => {
    const classes = useStyles();
    return (
        <PaddingPaper>
          asdsadasdsa
        </PaddingPaper>
    )
}