import { IFilterFieldProps } from './FilterField';
import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

export const FilterOneSelectField = (list: Array<string>, valueIsIndex?: boolean) => (props: IFilterFieldProps, valueInIndex = false) => {
    return (
        <FilterOneSelectFieldWrap {...{...props, list, valueIsIndex}} />
    )
}

const FilterOneSelectFieldWrap = (props: IFilterFieldProps & {list: Array<any>, valueIsIndex?: boolean} & {style?: any} ) => {
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
            {props.list.map((element, index) =>
                <MenuItem value={props.valueIsIndex ?  index : element}>
                    {element}
                </MenuItem>
            )}
        </TextField>
    )
}
