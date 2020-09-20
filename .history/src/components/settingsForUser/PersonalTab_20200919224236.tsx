import * as React from 'react';
import { Grid, Link, Switch, Typography, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';

export const PersonalTab = (props) => {
    const theme = useTheme();
    const [openChange, setOpenChange] = React.useState(false);

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container justify='flex-start'>
                { !openChange &&
                    <Link 
                        component='button' 
                        variant='h6'
                        onClick={() => setOpenChange(true)}
                    >
                        Сменить пароль
                    </Link>
                }
                { openChange &&
                    <ChangeComponent
                        handleClickClose={() => setOpenChange(false)}
                        role='SETTINGS_PERSONAL'
                        type='password'
                    />
                }
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography style={{width: '100px'}}>
                    Скрыть телефонный номер
                </Typography>
                <Switch
                    //checked={state.checkedA}
                    //onChange={handleChange}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography>
                    Скрыть ссылки на соцсети
                </Typography>
                <Switch
                    //checked={state.checkedA}
                    //onChange={handleChange}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography>
                    Скрыть адрес
                </Typography>
                <Switch
                    //checked={state.checkedA}
                    //onChange={handleChange}
                    color="primary"
                />
            </Grid>
        </Grid>
    )
}
         