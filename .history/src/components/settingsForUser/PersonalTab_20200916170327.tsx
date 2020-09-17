import * as React from 'react';
import { Grid, Link, useTheme } from '@material-ui/core';

export const PersonalTab = (props) => {
    const theme = useTheme();

    return( 
        <Grid /*style={{padding: theme.spacing(2)}}*/ container direction='column' justify='flex-start'>  
            <Link component='button'>Сменить пароль</Link>
        </Grid>
    )
}
         