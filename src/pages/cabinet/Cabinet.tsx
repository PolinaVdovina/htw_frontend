import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';

interface ICabinetProps {
    
}

export const Cabinet = (props : ICabinetProps) => {
    return (
        <HCenterizingGrid>
            {/*<JobSeekerCabinet/>*/}
            <AccountInfo></AccountInfo>
        </HCenterizingGrid>
        )
}