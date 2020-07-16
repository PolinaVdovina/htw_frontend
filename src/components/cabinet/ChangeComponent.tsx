import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { SETTINGS } from './accountSettings';

interface IChangeComponent {
    handleClickSave: () => void,
    handleClickClose: () => void,
    type: string,
    role: string
}

export const ChangeComponent = (props : IChangeComponent) => {
    const Component = SETTINGS[props.role][props.type].changeComponent;

    return (
        <Grid item container direction='column' justify='flex-start' style={{'padding': '7px'}}>
            { Component && <Component/>}
            <Grid item style={{'paddingTop': '10px'}}>
                <Button 
                    variant="contained"
                    color="primary" 
                    style={{'margin': '5px'}}
                    onClick={(event) => props.handleClickSave()}
                >
                    Сохранить
                </Button>
                <Button 
                    variant="contained"
                    style={{'margin': '5px'}}
                    onClick={(event) => props.handleClickClose()}
                >
                    Отменить
                </Button>
            </Grid>
        </Grid>
    )
}