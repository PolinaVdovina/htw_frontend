import * as React from 'react';
import { Grid, Typography, TextField, MenuItem, useTheme } from '@material-ui/core';

interface IEmployeeList {

}

export const EmployeeList = (props : IEmployeeList) => {
    const theme = useTheme();
    return(
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Typography>
                alijvbajwnvjnaweejfnalwekan
            </Typography>
        </Grid>
    )
}
