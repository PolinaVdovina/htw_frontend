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
import { useParams, useRouteMatch } from 'react-router';
import { activateAccountFetch } from '../../utils/fetchFunctions';
import { login, register, activate } from '../../redux/reducers/auth-reducers';
import { loginAction } from '../../redux/actions/auth-actions';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => ({
    authComplete: state.authReducer.authCompleteStatus
})

const mapDispatchToProps = {
    activate,
}

interface IAccountActivationSuccessProps {
    activate: typeof activate,
    authComplete?: boolean | null,
}

export const AccountActivationSuccess_Wrap = (props: IAccountActivationSuccessProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const routeMatch = useRouteMatch();
    const urlActivationCode = routeMatch.params['code'];
    const [success, setSuccess] = React.useState<null | boolean>(null);
    const activateAccount = async() => {
        await props.activate(urlActivationCode);
    }

    React.useEffect(
        () => {
            activateAccount();
        },
        []
    );

    return (
        <VHCenterizingGrid>

        </VHCenterizingGrid>
        )
}

export const AccountActivationSuccess = connect(mapStateToProps, mapDispatchToProps)(AccountActivationSuccess_Wrap);
