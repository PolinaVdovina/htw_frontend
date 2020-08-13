import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography } from '@material-ui/core';
import { addressGlue, jobApplGlue } from '../../../utils/appliedFunc';

interface IJobApplicant{
    element: any
}

export const JobApplicant = (props : IJobApplicant) => {
    return(
        <Typography>
            {
                jobApplGlue(props.element)
            }
        </Typography>
    )
}