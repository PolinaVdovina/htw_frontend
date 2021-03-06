import * as React from 'react';
import { RootState } from '../../redux/store';
import { Redirect, withRouter, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { urls } from '../../pages/urls';


interface IRedirectIfNotAuthorized {
    authorized?: boolean | null,
}

function mapStateToProps(state : RootState) {
    return {
      authorized: state.authReducer.authCompleteStatus,
    }
}

const RedirectIfNotAuthorizedComp = (props: IRedirectIfNotAuthorized) => {
    const currentUrl = useLocation().pathname;  
    return (
    <>
        {
        props.authorized != true && 
        currentUrl != urls.authentication.shortPath &&
        currentUrl != urls.registration.shortPath &&
        currentUrl != urls.registrationWithRole.shortPathEmployer &&
        currentUrl != urls.registrationWithRole.shortPathInstitution &&
        currentUrl != urls.registrationWithRole.shortPathJobseeker &&
        currentUrl != urls.accountActivation.shortPath &&
        !currentUrl.includes(urls.passwordRecoveryRequest.shortPath) && 
        !currentUrl.includes(urls.typeNewPassword.shortPath) && 
        !currentUrl.includes(urls.passwordRecoveryRequest.shortPath) && 
        !currentUrl.includes(urls.changeEmail.shortPath) &&
            <Redirect to={urls.authentication.shortPath}/> 
        }
    </>)
}

export const RedirectIfNotAuthorized = connect(mapStateToProps)(RedirectIfNotAuthorizedComp);

