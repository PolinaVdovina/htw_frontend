import * as React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

interface IChangePhone {
    
}

export const ChangePhone = (props : IChangePhone) => {
    return(
        <Grid item container direction='row' alignItems='center'>
            <Grid item>
                <Typography>
                    Новый телефон
                </Typography>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <TextField></TextField>
            </Grid>
        </Grid>
    )
}