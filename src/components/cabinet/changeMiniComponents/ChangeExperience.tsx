import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeExperience {
    data: string,
    onChange: (any) => void,
    type: string
}

export const ChangeExperience = (props : IChangeExperience) => {
    return(
        <TextField 
            size='small' 
            variant='outlined' 
            value={props.data[props.type]} 
            onChange={(event) => props.onChange({[props.type]: event.target.value})}
        />
    )
}