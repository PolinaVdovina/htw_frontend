import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeOneString {
    data: string,
    onChange: (any) => void
}

export const ChangeOneString = (props : IChangeOneString) => {
    return(
        <TextField 
            size='small' 
            variant='outlined' 
            value={props.data} 
            onChange={(event) => props.onChange(event.target.value)}
        />
    )
}