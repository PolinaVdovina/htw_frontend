import * as types from '../../constants/action-types';
import axios from 'axios';
import { loginAction, errorAction } from './../actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch, getEmployerFetch, registerFetch, isValidTokenFetch } from '../../utils/fetchFunctions';
import { addressGlue, genderIntToStr } from '../../utils/appliedFunc';
import { fillPersonalDataAction } from '../actions/user-personals';
import {loginFetch} from '../../utils/fetchFunctions'
import { enqueueSnackbar as enqueueSnackbarAction} from '../actions/snackbar-action';
import { getPersonalData } from './user-personals-reducers';

export interface IAuthState {
    loggedIn: boolean,
    login?: string | null,
    token?: string | null,
    user_id?: number | null,
    entityType?: string | null,
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
            entityType: action.entityType,
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


export const login: (identity: string, password: string) => void = (identity, password) => 
     async (dispatch, getState) => {
         
        await dispatch(startLoadingAction());
        const result = await loginFetch(identity, password);
        const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));

        if(result.msgStatus == "ok" && result.token && result.role) {
            
    
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.role);
            localStorage.setItem("login", identity);

            await dispatch(loginAction(identity, result.token, 0, result.role));
         
            await dispatch(getPersonalData(result.token));
            
            //alert(address);
        
            //alert(jobSeekerData.about);
            await dispatch(enqueueSnackbarAction({
                message:"Вы успешно вошли", 
                options: { variant: "success"}
            }));
            //alert('Вход выполнен');

        } else {
            await dispatch(enqueueSnackbarAction(
            {
                message:"Неверный логин или пароль",
                options: {variant: "error"}
            }));
            //alert("Неверный логин или пароль")
        }
        await dispatch(stopLoadingAction());

}



export const register: (identity: string, password: string, role: string, phone: string | null, email: string | null) => void = (identity, password, role, phone, email) => 
async (dispatch, getState) => {
    dispatch(startLoadingAction());
    const result = await registerFetch(identity, email, phone, password, role);

    await dispatch(fillPersonalDataAction({

    }));

    if(result.msgStatus == "ok" && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", role);
        localStorage.setItem("login", identity);
        dispatch(loginAction(identity, result.token, 0, role));
        dispatch( enqueueSnackbarAction({
            message: "Пользователь успешно зарегистрирован", 
            options: {variant: "success"}}));

    } 
    else {
        dispatch(enqueueSnackbarAction({
            message:"Такой пользователь уже существует", 
            options:{variant: "error"}
        }));
    }
    dispatch(stopLoadingAction());

}

export const reloadAuthData: (token: string) => void = (token: string) => 
async (dispatch, getState) => {
    await dispatch(startLoadingAction());
    
    const login = localStorage.getItem("login");
    const role = localStorage.getItem("role");

    if(login && role) {
        const isValidToken = await isValidTokenFetch(token);
        if(isValidToken) {
            await dispatch(loginAction(login, token, null, role))
            await dispatch(getPersonalData(token));
        } else {
            clearAuth();
        }
        
    } else {
        clearAuth();
    }

    await dispatch(stopLoadingAction());

}
 export const clearAuth = () => {
     if(localStorage.getItem("login"))
         localStorage.removeItem("login");
     if(localStorage.getItem("token"))
         localStorage.removeItem("token");
    if(localStorage.getItem("role"))
         localStorage.removeItem("role");
}


