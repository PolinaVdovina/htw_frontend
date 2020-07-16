import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

interface IChangeComponent {
    handleClickSave: (key: string) => void,
    handleClickClose: (key: string) => void,
    key: string
}

export const ChangeComponent = (props : IChangeComponent) => {
    return (
        <Grid item container direction='column' justify='flex-start' style={{'padding': '7px'}}>
            <Grid item container direction='row' alignItems='center'>
                <Grid item>
                    <Typography>
                        new
                    </Typography>
                </Grid>
                <Grid item style={{'paddingLeft': '10px'}}>
                    <TextField></TextField>
                </Grid>
            </Grid>
            <Grid item style={{'paddingTop': '10px'}}>
                <Button 
                    variant="contained"
                    color="primary" 
                    style={{'margin': '5px'}}
                    onClick={(/*props.key*/) => props.handleClickSave(props.key)}
                >
                    Сохранить
                </Button>
                <Button 
                    variant="contained"
                    style={{'margin': '5px'}}
                    onClick={(/*props.key*/) => props.handleClickClose(props.key)}
                >
                    Отменить
                </Button>
            </Grid>
        </Grid>
    )
}