import * as React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';

interface IChangeListOneSelect {
    onChange: (any) => void,
    type: string,
    list: string[],
    fullWidth?: boolean,
    value?: any
}

export const ChangeListOneSelect = (props: IChangeListOneSelect) => {
    return (
        <TextField
            select
            size='small'
            value={props.value}
            onChange={(event) => props.onChange({ [props.type]: event.target.value })}
            variant='outlined'
            style={{ width: props.fullWidth ? "100%" : "150px" }}
            required
        >
            {props.list.map(element =>
                <MenuItem value={element}>
                    {element}
                </MenuItem>
            )}
        </TextField>
    )
}
