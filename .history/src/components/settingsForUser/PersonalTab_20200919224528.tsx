import * as React from 'react';
import { createStyles, Grid, Link, makeStyles, Switch, Theme, Typography, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            width: '300px'
        },
    }),
);

export const PersonalTab = (props) => {
    const theme = useTheme();
    const classes = useStyles();
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
                <Typography className={classes.typography}>
                    Скрыть телефонный номер
                </Typography>
                <Switch
                    //checked={state.checkedA}
                    //onChange={handleChange}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть ссылки на соцсети
                </Typography>
                <Switch
                    //checked={state.checkedA}
                    //onChange={handleChange}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
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
         