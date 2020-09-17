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
         <Redirect to={urls.authentication.shortPath}/>
        }
    </>)
}

export const RedirectIfNotAuthorized = connect(mapStateToProps)(RedirectIfNotAuthorizedComp);

