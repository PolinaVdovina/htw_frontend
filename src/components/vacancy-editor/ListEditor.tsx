import { makeStyles, Theme, createStyles, Grid, Avatar, TextField, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Button, LinearProgress, Link } from '@material-ui/core';
import { withTheme } from 'react-jsonschema-form';

import { Theme as MaterialUITheme } from '@rjsf/material-ui';
import { ChangeListOneSelect } from '../cabinet/changeMiniComponents/ChangeListOneSelect';
import { ChangeMultiSelect } from './../cabinet/changeMiniComponents/ChangeMultiSelect';
import { v4 as uuidv4 } from 'uuid';

const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

interface IListElement {
    id: number,
    value: any,
}

interface IListEditorProps {
    title?: string,
    elementValues?: Array<IListElement>
    onValueChange?: (newValue, elementIndex) => {}
    onChange?: (newValues) => any,
    isMarker?: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    }),
);

const Form = withTheme(MaterialUITheme);


export const ListEditor = (props: IListEditorProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const textFieldChangeHandler = (newValue, changedIndex) => {
        if (props.elementValues) {
            const newElements = props.elementValues.map(
                (oldElement, sourceIndex) => (sourceIndex == changedIndex) ? { value: newValue, id: oldElement.id } : oldElement
            )
            props.onChange && props.onChange(newElements);
        }
    }

    const addFieldHandler = (newFieldIndex) => {
        if (props.elementValues) {
            //const newElements = [...props.elementValues, { value: null, id: uuidv4() }]
            const newElements = insert([...props.elementValues], newFieldIndex, { value: null, id: uuidv4() })
            props.onChange && props.onChange(newElements);

        } else {
            const newElements = []
            props.onChange && props.onChange(newElements);
        }
    }

    const deleteFieldHandler = (deleteFieldIndex) => {
        if (props.elementValues) {
            const newElements = props.elementValues.filter(
                (value, index) => index != deleteFieldIndex
            )
            props.onChange && props.onChange(newElements);

        }
    }


    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item container direction="row">
                {
                    props.title &&
                    <Typography style={{ marginRight: theme.spacing(1) }}>
                        {props.title}
                    </Typography>
                }
                <Link component='button'
                    onClick={() => { addFieldHandler(props.elementValues?.length) }}>
                    Добавить
                </Link>
            </Grid>
            {
                props.elementValues &&
                props.elementValues.map((elementValue, index) =>
                    <Grid key={elementValue.id} container item direction="row" style={{ flexWrap: "nowrap" }}>
                        {index + 1})
                    <TextField
                            autoFocus
                            onChange={
                                (event) => textFieldChangeHandler(event.target.value, index)
                            }
                            onKeyPress={e => {
                                if (e.key == "Enter") {
                                    addFieldHandler(index+1);
                                    e.preventDefault();
                                }
                            }}
                            value={elementValue.value}
                            multiline
                            size="small"
                            style={{ flexGrow: 1, paddingLeft: theme.spacing(1), marginRight: theme.spacing(1) }}
                        />
                        <Grid item>
                            <Link component='button'
                                onClick={() => { deleteFieldHandler(index) }}>
                                Удалить
                    </Link>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}