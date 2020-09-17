import * as React from 'react';
import { Grid, Link } from '@material-ui/core';

export const PersonalTab = (props) => {
    return( 
        <Grid style={{padding:props.theme.spacing(2)}} container direction='column'>  
            <Link component='button'>Сменить пароль</Link>
        </Grid>
    )
}
         