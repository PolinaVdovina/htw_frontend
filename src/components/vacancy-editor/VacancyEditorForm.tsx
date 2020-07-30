import { makeStyles, Theme, createStyles, Grid, Avatar, TextField, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Button, LinearProgress } from '@material-ui/core';
import { withTheme } from 'react-jsonschema-form';

import { Theme as MaterialUITheme } from '@rjsf/material-ui';

interface IVacancyEditorProps {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding:theme.spacing(2),
        },
        fieldGrid: {
            marginBottom: theme.spacing(2),
        },
        fieldTitle: {
            marginRight: theme.spacing(1),
            minWidth: "120px"
        }
    }),
);

const Form = withTheme(MaterialUITheme);


export const VacancyEditorForm = (props: IVacancyEditorProps) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item container direction="column" className={classes.fieldGrid}>
                <Typography className={classes.fieldTitle}>Должность</Typography>
                <TextField
                fullWidth
                variant="outlined"
                size="small"/>
            </Grid>
            <Grid item container direction="column" className={classes.fieldGrid}>
                <Typography className={classes.fieldTitle}>Опыт работы</Typography>
                <TextField
                fullWidth
                variant="outlined"
                size="small"/>
            </Grid>
            <Grid item container direction="column" className={classes.fieldGrid}>
                <Typography className={classes.fieldTitle}>Описание</Typography>
                <TextField
                fullWidth
                variant="outlined"
                multiline
                size="small"/>
            </Grid>
            <Button variant="contained" color="primary">Добавить вакансию</Button>
        </Grid>
    )
}