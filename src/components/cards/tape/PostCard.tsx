import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, Avatar} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { PaddingPaper } from '../PaddingPaper';

export interface IPostData {
  title?: string,
  body?: string,
  fileList?: FileList,
  createdAt?: string,
  lastChange?: string,
  owner?: string,    
}

interface IPostProps extends IPostData {
  postData: IPostData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutGrid: {
      alignItems: "center",
      flexWrap: "nowrap",
      marginBottom: theme.spacing(1)
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
    descriptionBlock: {
      fontSize:"12px", 
    }
  }),
);



export const PostCard = (props: IPostProps) => {
    const classes = useStyles();
    return (
        <PaddingPaper>
          <Grid container direction="row" className={classes.aboutGrid}>
            <Avatar className={classes.avatar} />
            <Grid item container  direction="column">
              <Typography>{props.postData.title}</Typography>
              <Typography className={classes.descriptionBlock}>{props.postData.createdAt}</Typography>
            </Grid>
          </Grid>
          <Typography>{props.postData.body}</Typography>
        </PaddingPaper>
    )
}