import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { Tape } from '../../components/tape/Tape';
import { PaddingPaper } from '../../components/cards/PaddingPaper';
import { Typography, useTheme, Grid, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { useDispatch, connect } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { useParams, useRouteMatch, Redirect } from 'react-router';
import { activateAccountFetch, changeEmailFetch } from '../../utils/fetchFunctions';
import { login, register, activate } from '../../redux/reducers/auth-reducers';
import { loginAction } from '../../redux/actions/auth-actions';
import { RootState } from '../../redux/store';
import { urls } from '../urls';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { useSnackbar } from 'notistack';

const mapStateToProps = (state: RootState) => ({
    login: state.authReducer.login,
    token: state.authReducer.token,
})

export const ChangeEmail_Wrap = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const routeMatch = useRouteMatch();
    const tokenUrl = routeMatch.params['token'];
    const snackBar = useSnackbar();
    const [success, setSuccess] = React.useState<null | boolean>(null);

    const changeEmail = async() => {
        await dispatch(startLoadingAction());
        const result = await changeEmailFetch(tokenUrl);
        if(result.msgStatus == MessageStatus.OK)
            snackBar.enqueueSnackbar("Электронная почта изменена", {variant: "success"});
        else
            snackBar.enqueueSnackbar("Не удалось изменить электронную почту", {variant: "error"});
        await dispatch(stopLoadingAction());
    }

    React.useEffect(
        () => {
            changeEmail();
        },
        []
    );

    return (
        <VHCenterizingGrid>
            <Redirect to={urls.cabinet.shortPath + props.login}/>
        </VHCenterizingGrid>
        )
}

export const ChangeEmail = connect(mapStateToProps)(ChangeEmail_Wrap);
