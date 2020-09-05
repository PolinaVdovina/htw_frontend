import { TextField } from "@material-ui/core"
import React from "react"
import { IFilterFieldProps } from "./FilterField"
import { isNumber } from "util"
import { validateNumber } from './../../../utils/validateFunctions';

export const FilterTextField = (props) => {
    return (
        <TextField
            style={{ flexGrow: 1, ...props.style }}
            variant="outlined"
            size="small"
            {...props}
            value={props.value != null ? props.value : ""}
            onChange={(event) => { props.onChange && props.onChange(event.target.value) }} />
    )
}

export const FilterNumericField = (props) => {
    const changeHandler = (event) => {
        if (props.onChange) {
            if (validateNumber(event.target.value) || !event.target.value) {
                props.onChange(event.target.value)
            } 
        }

    }
    return (
        <TextField
            style={{ flexGrow: 1, ...props.style }}
            variant="outlined"
            size="small"
            {...props}
            onChange={changeHandler} />
    )
}