import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';

interface IJobSeekerCabinet {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "297px",
      flex: 1,
    },
  }),
);

export const JobSeekerCabinet = (props: IJobSeekerCabinet) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            
        </Paper>
    )
}