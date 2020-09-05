import { TextField, Typography, useTheme, Grid } from "@material-ui/core"
import React from "react"
import { IFilterFieldProps } from "./FilterField"

interface IRangeFieldValue {
    min?: number,
    max?: number,
}

export const RangeField = (Component) => (props: IFilterFieldProps) => {
    return <RangeFieldWrap {...{ ...props, Component }} />
}

const RangeFieldWrap = (props: IFilterFieldProps & { Component: any }) => {
    const value: IRangeFieldValue = props.value;
    const min = value && value.min;
    const max = value && value.max;
    const changeHandler = (newMin, newMax) => {
        props.onChange && props.onChange({ min: newMin, max: newMax })
    }

    const theme = useTheme();

    return (
        <Grid alignItems="center" container direction="row" style={{flexWrap:"nowrap"}}>
            <Typography style={{ marginRight: theme.spacing(1) }}>
                От
            </Typography>
            <props.Component
                style={{ marginRight: theme.spacing(2) }}
                value={min != null ? min : ""}
                onChange={(value) => changeHandler(value, max)} />

            <Typography style={{ marginRight: theme.spacing(1) }}>
                До
            </Typography>
            <props.Component

                value={max != null ? max : ""}
                onChange={(value) => changeHandler(min, value)} />
        </Grid>
    )
}

