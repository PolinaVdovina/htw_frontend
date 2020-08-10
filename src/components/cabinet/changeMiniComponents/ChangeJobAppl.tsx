import * as React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';

interface IChangeJobAppl {
    data: number,
    onChange: (any) => void,
    type: string
}

export const ChangeJobAppl = (props : IChangeJobAppl) => {
    return(
        <TextField></TextField>
    )
}