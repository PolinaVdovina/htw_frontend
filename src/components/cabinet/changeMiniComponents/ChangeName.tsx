import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeName {
    
}

export const ChangeName = (props : IChangeName) => {
    return(
        <Grid container direction='column' style={{'width': '285px'}}>
            <Grid item container direction='row' alignItems='center' justify='space-between'>
                <Grid item>
                    <Typography>
                        Фамилия
                    </Typography>
                </Grid>
                <Grid item style={{'paddingLeft': '10px'}}>
                    <TextField></TextField>
                </Grid>
            </Grid>
            <Grid item container direction='row' alignItems='center' justify='space-between'>
                <Grid item>
                    <Typography>
                        Имя
                    </Typography>
                </Grid>
                <Grid item style={{'paddingLeft': '10px'}}>
                    <TextField></TextField>
                </Grid>
            </Grid>
            <Grid item container direction='row' alignItems='center' justify='space-between'>
                <Grid item>
                    <Typography>
                        Отчество
                    </Typography>
                </Grid>
                <Grid item style={{'paddingLeft': '10px'}}>
                    <TextField></TextField>
                </Grid>
            </Grid>
        </Grid>     
    )
}