import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';

interface ICabinetProps {
    
}

export const Cabinet = (props : ICabinetProps) => {
    return (
        <HCenterizingGrid>
                <JobSeekerCabinet/>
        </HCenterizingGrid>
        )
}