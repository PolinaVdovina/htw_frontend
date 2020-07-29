import * as React from 'react';
import { RootState } from '../../redux/store';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { urls } from '../../pages/urls';


interface IRedirectIfAuthorized {
    authorized: boolean,
    isPersonalDataFetched: boolean,
    login?: string | null,
}

function mapStateToProps(state : RootState) {
    return {
      authorized: state.authReducer.loggedIn,
      isPersonalDataFetched: state.userPersonalsReducer.isFetched,
      login: state.authReducer.login
    }
}

const RedirectIfAuthorizedComp = (props: IRedirectIfAuthorized) => {
    return (
    <>
        {props.authorized && props.isPersonalDataFetched && <Redirect to={urls.cabinet.shortPath+props.login}/>}
    </>)
}

export const RedirectIfAuthorized = connect(mapStateToProps)(RedirectIfAuthorizedComp);

