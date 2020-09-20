import * as React from 'react';
import { createStyles, Grid, Link, makeStyles, Switch, Theme, Typography, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { useDispatch, connect } from 'react-redux';
import { changeSettingsAction } from '../../redux/actions/settings-actions';
import { RootState } from '../../redux/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            width: '300px'
        },
    }),
);

const mapStateToProps = (state: RootState) => ({
    phone: state.settingsReducer.phone,
    address: state.settingsReducer.address,
    socmedia: state.settingsReducer.socmedia
})

export const PersonalTabComp = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openChange, setOpenChange] = React.useState(false);

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть телефонный номер
                </Typography>
                <Switch
                    checked={!props.phone}
                    onChange={() => dispatch(changeSettingsAction({phone: false}))}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть ссылки на соцсети
                </Typography>
                <Switch
                    checked={!props.socmedia}
                    onChange={() => dispatch(changeSettingsAction({socmedia: false}))}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть адрес
                </Typography>
                <Switch
                    checked={!props.address}
                    onChange={() => dispatch(changeSettingsAction({address: false}))}
                    color="primary"
                />
            </Grid>
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
        </Grid>
    )
}

export const PersonalTab = connect(mapStateToProps)(PersonalTabComp)
         