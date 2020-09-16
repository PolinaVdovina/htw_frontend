import * as React from 'react';
import { Grid, Link, useTheme } from '@material-ui/core';

export const PersonalTab = (props) => {
    const theme = useTheme();

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container justify='flex-start'>
                <Link component='button' variant='h10'>Сменить пароль</Link>
            </Grid>
            
        </Grid>
    )
}
         