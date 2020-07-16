import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangeEmail {
    
}

export const ChangeEmail = (props : IChangeEmail) => {
    return(
        <Grid item container direction='row' alignItems='center'>
            <Grid item>
                <Typography>
                    Новый e-mail
                </Typography>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <TextField></TextField>
            </Grid>
        </Grid>
    )
}