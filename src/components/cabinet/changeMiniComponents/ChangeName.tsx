import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeName {
    
}

export const ChangeName = (props : IChangeName) => {
    return(
        <TextField  size='small' variant='outlined'></TextField>
    )
}