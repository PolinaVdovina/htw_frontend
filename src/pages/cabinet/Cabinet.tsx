import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/cards/tape/Tape';
import { IPostData } from './../../components/cards/tape/PostCard';
import { Grid } from '@material-ui/core';

interface ICabinetProps {
    
}

const testPosts: Array<IPostData> = [
    {
      title: "Пост о себе",
      body: "Я прекрасен, завидуйте молча. Сами вы уроды!",
      owner: "Прекрасный"
    }
]

export const Cabinet = (props : ICabinetProps) => {
    return (
        <HCenterizingGrid>
            <Grid spacing={2} container item direction="column">
                {/*<JobSeekerCabinet/>*/}
                <Grid item>
                    <AccountInfo role='JOBSEEKER'/>
                </Grid>
                <Grid item>
                    <Tape posts={testPosts}/>
                </Grid>
            </Grid>
        </HCenterizingGrid>
        )
}