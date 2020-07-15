import * as types from '../../constants/action-types';

export function login(login, token, id, roles) {
    return {
      type: types.LOG_IN,
      authFunction: 
      login,
      token,
      id,
      roles,
    };
  }
  

  export function logout() {
    return {
      type: types.LOG_OUT,
    };
  }
  