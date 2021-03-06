import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { CabinetContext } from '../cabinet-context';

interface IChangeEmail {
    data: string,
    onChange: (any) => void,
    type: string,
    disabled?: boolean
    defaultValue?: any
}

export const ChangeEmail = (props: IChangeEmail) => {
    React.useEffect(() => {
        if (props.disabled && props.defaultValue)
            props.onChange({ [props.type]: props.defaultValue })
    }, [])

    return (
        <TextField
            size='small'
            variant='outlined'
            autoComplete="email"
            value={props.data[props.type]}
            defaultValue={props.defaultValue ? props.defaultValue : ''}
            onChange={(event) =>  props.onChange({ [props.type]: event.target.value })}                  
            disabled={props.disabled ? props.disabled : false}
            required
        />
    )
}