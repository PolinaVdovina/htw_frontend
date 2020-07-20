import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeName {
    data: {
        firstname: string, 
        lastname: string, 
        patronymic: string
    },
    onChange: (any) => void,
    type: string
}

export const ChangeName = (props : IChangeName) => {
    return(
        <TextField 
            size='small' 
            variant='outlined'
            value={props.data[props.type]}
            onChange={(event) => {
                let obj = {
                    ...props.data
                }
                obj[props.type] = event.target.value;
                props.onChange(obj)
            }}
        />
    )
}