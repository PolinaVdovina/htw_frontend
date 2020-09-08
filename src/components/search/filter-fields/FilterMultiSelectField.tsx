import { IFilterFieldProps } from './FilterField';
import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { ChangeMultiSelect } from '../../cabinet/changeMiniComponents/ChangeMultiSelect';

export const FilterMultiSelectField = (list: Array<string>) => (props: IFilterFieldProps) => {
    return (
        <FilterMultiSelectFieldWrap {...{ ...props, list }} />
    )
}

const FilterMultiSelectFieldWrap = (props: IFilterFieldProps & { list: Array<any> } & { style?: any }) => {
    const a = props;
    return (
        <ChangeMultiSelect
            value = {props.value}
            fullWidth
            list={props.list}
            type="industry" onChange={(value) => props.onChange && props.onChange(value['industry'])} />
    )
}
