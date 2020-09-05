import { IFilterFieldProps } from './FilterField';
import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

export const FilterOneSelectField = (list: Array<string>) => (props: IFilterFieldProps) => {
    return (
        <FilterOneSelectFieldWrap {...{...props, list}} />
    )
}

const FilterOneSelectFieldWrap = (props: IFilterFieldProps & {list: Array<any>} & {style?: any}) => {
    const a = props;
    return (
        <TextField
            style={{...props.style, flexGrow: 1}}
            select
            size='small'
            value={props.value == null ? "" : props.value}
            variant='outlined'
            onChange={(event) => props.onChange && props.onChange(event.target.value)}
        >
            {props.list.map(element =>
                <MenuItem value={element}>
                    {element}
                </MenuItem>
            )}
        </TextField>
    )
}
