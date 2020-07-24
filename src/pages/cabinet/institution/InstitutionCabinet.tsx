import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cards/AccountInfo';

interface IInstitutionCabinet {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "297px",
      flex: 1,
    },
  }),
);

export const InstitutionCabinet = (props: IInstitutionCabinet) => {
    const classes = useStyles();
    return (
            <AccountInfo role='LEGAL' settingsView={['inn', 'ogrn', 'address', 'email', 'phone']}/>
    )
}