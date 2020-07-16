import * as types from '../../constants/action-types';


export function loginAction(login, token, id, entityType) {
    return {
      type: types.LOG_IN,
      authFunction: 
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
  

  export function errorAction() {
    return {
      type: types.LOG_IN_ERROR,
    };
  }
  