import * as React from 'react';
import { RootState } from '../../redux/store';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { urls } from '../../pages/urls';


interface IRedirectIfAuthorized {
    authorized: boolean,
}

function mapStateToProps(state : RootState) {
    return {
      authorized: state.authReducer.loggedIn,
    }
}

const RedirectIfAuthorizedComp = (props: IRedirectIfAuthorized) => {
    return (
    <>
        {props.authorized && <Redirect to={urls.cabinet.shortPath+"1"}/>}
    </>)
}

export const RedirectIfAuthorized = connect(mapStateToProps)(RedirectIfAuthorizedComp);

