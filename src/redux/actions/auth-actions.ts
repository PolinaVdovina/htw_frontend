import * as types from '../../constants/action-types';


export function loginAction(login, token, id, entityType) {
  return {
    type: types.LOG_IN,
    login,
    token,
    id,
    entityType,
  };
}


export function logoutAction() {
  return {
    type: types.LOG_OUT,
  };
}


export function AuthFetchNotRequiredAction() {
  return {
    type: types.AUTH_FETCH_NOT_REQUIRED,
  };
}




export function errorAction() {
  return {
    type: types.LOG_IN_ERROR,
  };
}


export function authCompletedAction(loggedIn=true) {
  return {
    type: types.AUTH_COMPLETED,
    loggedIn,
  };
}
