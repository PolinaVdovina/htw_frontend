import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography } from '@material-ui/core';
import { addressGlue } from '../../../utils/appliedFunc';

interface ISimpleLink{
    element: any
}

export const SimpleLink = (props : ISimpleLink) => {
    return(
        <Typography>
            {
                addressGlue(props.element)
            }
        </Typography>
    )
}