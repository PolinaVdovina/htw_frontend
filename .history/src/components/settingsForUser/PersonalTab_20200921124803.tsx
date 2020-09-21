import * as React from 'react';
import { createStyles, Grid, Link, makeStyles, Switch, Theme, Typography, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { useDispatch, connect } from 'react-redux';
import { changeSettingsAction } from '../../redux/actions/settings-actions';
import { RootState } from '../../redux/store';
import { useSnackbar } from 'notistack';
import { changePersonalDataFetch, getEmployeesListFetch } from '../../utils/fetchFunctions';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';

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
    const snackbar = useSnackbar();
    const [openChange, setOpenChange] = React.useState(false);
    const [privatePhone, setPrivatePhone] = React.useState(false);
    const [privateAddress, setPrivateAddress] = React.useState(false);
    const [privateSocMedia, setPrivateSocMedia] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async() => {
            const result = await getEmployeesListFetch(props.token, "/account/changeSettings/get")
            if (result.msgStatus == 'ok') {
                setPrivatePhone(result.phonePrivate)
                setPrivateAddress(result.addressPrivate)
                setPrivateSocMedia(result.socMediaPrivate)
            }
            else
                snackbar.enqueueSnackbar("Ошибка загрузки настроек", {variant: "error"})
        }
        fetchData();
    }, [])

    const handleClickChangePhonePrivate = async() => {
        const msgInfo: IMessageInfo = await changePersonalDataFetch(props.token, {phonePrivate: !privatePhone}, '/account/changeSettings/set')
        if(msgInfo.msgStatus == MessageStatus.OK) {
            snackbar.enqueueSnackbar("Настройки конфиденциальности изменены", {variant: "success"})
            setPrivatePhone(!privatePhone)
        }
        else {
            snackbar.enqueueSnackbar("Ошибка изменения настроек", {variant: "error"})
        }

    }

    const handleClickChangeAddressPrivate = async() => {
        const msgInfo: IMessageInfo = await changePersonalDataFetch(props.token, {addressPrivate: !privateAddress}, '/account/changeSettings/set')
        if(msgInfo.msgStatus == MessageStatus.OK) {
            snackbar.enqueueSnackbar("Настройки конфиденциальности изменены", {variant: "success"})
            setPrivateAddress(!privateAddress)
        }
        else {
            snackbar.enqueueSnackbar("Ошибка изменения настроек", {variant: "error"})
        }

    }

    const handleClickChangeSocMediaPrivate = async() => {
        const msgInfo: IMessageInfo = await changePersonalDataFetch(props.token, {socMediaPrivate: !privateSocMedia}, '/account/changeSettings/set')
        if(msgInfo.msgStatus == MessageStatus.OK) {
            snackbar.enqueueSnackbar("Настройки конфиденциальности изменены", {variant: "success"})
            setPrivateSocMedia(!privateSocMedia)
        }
        else {
            snackbar.enqueueSnackbar("Ошибка изменения настроек", {variant: "error"})
        }

    }

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть телефонный номер
                </Typography>
                <Switch
                    checked={privatePhone}
                    onChange={handleClickChangePhonePrivate}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть ссылки на соцсети
                </Typography>
                <Switch
                    checked={privateSocMedia}
                    onChange={handleClickChangeSocMediaPrivate}
                    color="primary"
                />
            </Grid>
            <Grid item container direction='row' alignItems='center'>
                <Typography className={classes.typography}>
                    Скрыть адрес
                </Typography>
                <Switch
                    checked={privateAddress}
                    onChange={handleClickChangeAddressPrivate}
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
         