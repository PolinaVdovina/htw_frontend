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
    role: state.authReducer.entityType,
    token: state.authReducer.token
})

export const PersonalTabComp = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openChange, setOpenChange] = React.useState(false);
    const [privatePhone, setPrivatePhone] = React.useState(false);
    const [privateAddress, setPrivateAddress] = React.useState(false);
    const [privateSocMedia, setPrivateSocMedia] = React.useState(false);

    React.useEffect(() => {

    }, [])

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть телефонный номер
                </Typography>
                <Switch
                    checked={privatePhone}
                    onChange={() => dispatch(changeSettingsAction({phone: false}))}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть ссылки на соцсети
                </Typography>
                <Switch
                    checked={privateSocMedia}
                    onChange={() => dispatch(changeSettingsAction({socmedia: false}))}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть адрес
                </Typography>
                <Switch
                    checked={privateAddress}
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
         