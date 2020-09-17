import * as React from 'react';
import { RootState } from '../../redux/store';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { urls } from '../../pages/urls';


interface IRedirectIfAuthorized {
    authorized?: boolean | null,
    login?: string | null,
}

function mapStateToProps(state : RootState) {
    return {
      authorized: state.authReducer.authCompleteStatus,
      isPersonalDataFetched: state.userPersonalsReducer.isFetched,
      login: state.authReducer.login
    }
}

const RedirectIfAuthorizedComp = (props: IRedirectIfAuthorized) => {
    return (
    <>
        {props.authorized  && <Redirect to={urls.cabinet.shortPath+props.login}/>}
    </>)
}

export const RedirectIfAuthorized = connect(mapStateToProps)(RedirectIfAuthorizedComp);

