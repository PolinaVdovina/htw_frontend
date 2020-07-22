import * as types from '../../constants/action-types';
import axios from 'axios';
import { loginAction, errorAction } from './../actions/auth-actions';

export interface IAuthState {
    loggedIn: boolean,
    login?: string | null,
    token?: string | null,
    user_id?: number | null,
    entityType?: number | null,
    error?: string | null,
    msgStatus?: string | null,
}

const initialState: IAuthState = {
    loggedIn: false,
    login: null,
    token: null,
    user_id: null,
    entityType: null,
    error: null,
    msgStatus: null,
    
  };


export function authReducer(state = initialState, action): IAuthState {
    switch (action.type) {
        case types.LOG_IN:
        return {
            loggedIn: true,
            login: action.login,
            token: action.token,
            user_id: action.id,
            entityType: action.roles,
            msgStatus: "ok"
            
        }
        case types.LOG_OUT:
            return initialState;
        case types.LOG_IN_ERROR:
            return {
                loggedIn: false,
                msgStatus: "error"
            }
        default:
            return state;
    }
}


// export const login: (identity: string, password: string) => void = (identity, password) => 
//     async (dispatch, getState) => {
//         await dispatch(startLoading());
//         const result =  await axios.post("auth/login", {
//             accountLogin: identity,
//             password: password,
//         })
//         alert(JSON.stringify(result))
//         clearAuth();
//         if(result.data.token && result.data.accountLogin) {
//             localStorage.setItem("login",result.data.accountLogin);
//             localStorage.setItem("token",result.data.token);
//             await dispatch(loginAction(result.data.accountLogin, result.data.token, 0, 0));
//         }
//         else {
//             await dispatch(errorAction);
//         }
//         await dispatch(stopLoading());
//     }


// export const register: (identity: string, password: string) => void = async (identity, password) => {
//     startLoading();
// }

// export const clearAuth = () => {
//     if(localStorage.getItem("login"))
//         localStorage.removeItem("login");
//     if(localStorage.getItem("token"))
//         localStorage.removeItem("token");
// }