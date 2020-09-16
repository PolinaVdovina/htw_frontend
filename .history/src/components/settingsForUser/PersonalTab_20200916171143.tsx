import * as React from 'react';
import { Grid, Link, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';

export const PersonalTab = (props) => {
    const theme = useTheme();
    const [openChange, setOpenChange] = React.useState(false);

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container justify='flex-start'>
                <Link 
                    component='button' 
                    variant='h6'
                    onClick={() => setOpenChange(true)}
                >
                    Сменить пароль
                </Link>
                { openChange &&
                    <ChangeComponent
                        handleClickClose={() => setOpenChange(false)}
                        role='SETTINGS_PERSONAL'
                        type='password'
                    />
                }
            </Grid>
            
        </Grid>
    )
}
         