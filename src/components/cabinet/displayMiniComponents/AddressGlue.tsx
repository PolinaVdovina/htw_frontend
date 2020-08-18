import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography } from '@material-ui/core';
import { addressGlue } from '../../../utils/appliedFunc';

interface IAddressGlue{
    element: any
}

export const AddressGlue = (props : IAddressGlue) => {
    return(
        <Typography>
            {
                addressGlue(props.element)
            }
        </Typography>
    )
}