import * as React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';

interface IChangeGender {
    data: number,
    onChange: (any) => void,
    type: string,
}

export const ChangeGender = (props : IChangeGender) => {
    return(
        <TextField
          select
          size='small'
          onChange={(event) => props.onChange({[props.type]: event.target.value})}
          variant='outlined'
          style={{width:"150px"}}
        >
            <MenuItem>
                Не задано
            </MenuItem>
            <MenuItem value={0}>
                Мужской
            </MenuItem>
            <MenuItem value={1}>
                Женский
            </MenuItem>
            <MenuItem value={2}>
                Другое
            </MenuItem>
        </TextField>
    )
}