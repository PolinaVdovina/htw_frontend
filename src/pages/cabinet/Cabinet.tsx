import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/cards/tape/Tape';
import { IPostData } from './../../components/cards/tape/PostCard';
import { Grid } from '@material-ui/core';
import { getJobSeeker } from '../../utils/fetchFunctions';

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
    React.useEffect(() => {
        const getDataFunc = async() => await getJobSeeker();
        const data = getDataFunc();
        
    })
    return (
        <HCenterizingGrid>
                {/*<JobSeekerCabinet/>*/}
            <AccountInfo  role='JOBSEEKER'/>
        </HCenterizingGrid>
        )
}