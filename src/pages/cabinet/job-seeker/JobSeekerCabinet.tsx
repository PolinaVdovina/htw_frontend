import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';

interface IJobSeekerCabinet {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

      flex: 1,
    },
  }),
);

export const JobSeekerCabinet = (props: IJobSeekerCabinet) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            sds
        </Paper>
    )
}