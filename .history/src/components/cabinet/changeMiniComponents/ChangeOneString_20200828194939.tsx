import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeOneString {
    data: string,
    onChange: (any) => void,
    type: string,
    disable?: boolean
}

export const ChangeOneString = (props: IChangeOneString) => {
    return (
        <TextField
            size='small'
            variant='outlined'
            value={props.data[props.type]}
            onChange={(event) => props.onChange({ [props.type]: event.target.value })}
            disabled={props.disable ? props.disable : false}
        />
    )
}