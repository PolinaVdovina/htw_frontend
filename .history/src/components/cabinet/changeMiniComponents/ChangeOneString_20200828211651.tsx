import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { CabinetContext } from '../cabinet-context';

interface IChangeOneString {
    data: string,
    onChange: (any) => void,
    type: string,
    disabled?: boolean
    defaultValue?: any
}

export const ChangeOneString = (props: IChangeOneString) => {
    const context = React.useContext(CabinetContext);

    return (
        <TextField
            size='small'
            variant='outlined'
            value={props.data[props.type]}
            defaultValue={props.defaultValue ? props.defaultValue : ''}
            onChange={(event) => props.onChange({ [props.type]: event.target.value })}
            disabled={props.disabled ? props.disabled : false}
        />
    )
}