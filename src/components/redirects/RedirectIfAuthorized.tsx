import * as React from 'react';
import { RootState } from '../../redux/store';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';


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
        {props.authorized && <Redirect to="/"/>}
    </>)
}

export const RedirectIfAuthorized = connect(mapStateToProps)(RedirectIfAuthorizedComp);

